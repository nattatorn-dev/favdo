import { makeExecutableSchema } from "graphql-tools";
import { withFilter, PubSub } from "graphql-subscriptions";
import jwt from "jwt-simple";
import faker from "faker";
import PostModel from "./Post";
import UserModel from "./User";
import logger from "./logger";
import { fetchOpenGraphByUrl } from "../services/api";

const generateNoteBooks = (limit = 10) => {
  let notebooks = [];

  for (let i = 0; i < limit; ++i) {
    notebooks.push({
      _id: faker.random.uuid(),
      title: faker.lorem.sentence(),
      excerpt: faker.lorem.lines(),
      description: faker.lorem.paragraphs(),
      url: faker.internet.url(),
      image: {
        url: i % 2 === 0 ? faker.image.avatar() : null
      },
      tags: [
        {
          _id: faker.random.uuid(),
          name: faker.lorem.slug()
        },
        {
          _id: faker.random.uuid(),
          name: faker.lorem.slug()
        },
        {
          _id: faker.random.uuid(),
          name: faker.lorem.slug()
        }
      ],
      isFavorite: true,
      createdAt: faker.date.past(),
      updatedAt: faker.date.past()
    });
  }

  return notebooks;
};

const fs = require("fs");

const pubsub = new PubSub();
const typeDefs = [
  `
  type User {
    id: String!
    username: String!
    dispName: String!
  }

  type UserToken {
    userId: String!,
    token: String!,
    user: User
  }

  type Post {
    id: String
    title: String
    description: String
    url: String
    votes: Int
    openGraph: String
    createdAt: String
    updateAt: String
    isDeleted: Boolean
  }

  type Count {
    count: Int
  }

  enum OrderPost {
    createdAt_DESC
  }

  input Upload {
    name: String!
    type: String!
    size: Int!
    path: String!
  }

  type File {
    name: String!
    type: String!
    size: Int!
    path: String!
  }

  type ImageOpenGraph {
    url: String
    width: String
    height: String
    type: String
  }

  type OpenGraph {
    ogSiteName: String
    ogLocale: String
    ogUrl: String
    ogType: String
    ogTitle: String
    ogDescription: String
    ogImage: ImageOpenGraph
  }

  type Document {
    count: Int
    fileName: String!
    dispName: String!
  }

  type NoteBookImage {
    url: String
  }

  type Tag {
    _id: String!
    name: String!
  }

  type NoteBook {
    _id: String!
    title: String!
    excerpt: String
    description: String
    url: String!
    image: NoteBookImage
    tags: [Tag]
    isFavorite: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    me: User
    post(id: String) : Post
    allPosts(orderBy: OrderPost, skip: Int, first: Int): [Post]
    allLibrary: [Document]
    allNotebooks: [Document]
    allNotebook: [NoteBook]
    _allPostsMeta: Count
  }

  type Mutation {
    login(username: String!, password: String!): UserToken
    register(dispName: String, username: String, password: String): User
    createPost(title: String, url: String): Post
    updatePost(id: String, votes: Int): Post
    singleUpload (file: Upload!): File!
    multipleUpload (files: [Upload!]!): [File!]!
    openGraph(url: String): OpenGraph
  }

  type Subscription {
    postAdded: Post
  }

  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`
];
let nextMessage = 4;

const resolvers = {
  Query: {
    me: (root, args) => {
      return root.user;
    },
    post: (root, { id }, context) => {
      return new Promise((resolve, reject) => {
        PostModel.findById({
          _id: id
        }).then(res => resolve(res));
      });
    },
    allPosts: (root, { orderBy, skip, first }, context) => {
      return PostModel.find({}, null, { skip, limit: first });
    },
    allLibrary: () => {
      return [
        { count: 3, fileName: "inbox", dispName: "Inbox" },
        { count: 15, fileName: "favorite", dispName: "favorites" },
        { count: 18, fileName: "recent", dispName: "Recents" },
        { count: 5, fileName: "trash", dispName: "Trash" },
        { count: 102, fileName: "notebooks", dispName: "All Notes" }
      ];
    },
    allNotebooks: () => {
      return [
        { count: 68, fileName: "notebook", dispName: "React" },
        { count: 30, fileName: "notebook", dispName: "Angular" },
        { count: 22, fileName: "notebook", dispName: "Vue" },
        { count: 10, fileName: "notebook", dispName: "Devops" }
      ];
    },
    allNotebook: () => {
      return generateNoteBooks(2);
    },
    _allPostsMeta: () => {
      return new Promise((resolve, reject) => {
        PostModel.find().count((err, count) => {
          resolve({ count });
        });
      });
    }
  },
  Mutation: {
    login: (root, args) => {
      return UserModel.findOne({ username: args.username }).then(user => {
        if (!user || !user.validPassword(args.password)) {
          throw new Error("Username or password not match");
        }

        return Promise.resolve({
          userId: user._id,
          token: jwt.encode(
            { sub: user._id, iat: new Date().getTime(), login: user.username },
            process.env.SECRET
          )
        });
      });
    },
    register: (root, args) => {
      return UserModel.findOne({ username: args.username }).then(user => {
        if (user) {
          throw new Error("Username already exist");
        }

        return new UserModel(args).save();
      });
    },
    createPost(root, { title, url }) {
      return new Promise((resolve, reject) => {
        let newPost = new PostModel({
          title,
          url,
          createdAt: new Date(),
          votes: 0
        });
        newPost
          .save()
          .then(post => {
            pubsub.publish("postAdded", { postAdded: post });
            resolve(post);
          })
          .error(err => {
            reject("failed to create post");
          });
      });
    },
    updatePost(root, { id, votes }) {
      return PostModel.findOneAndUpdate(
        { _id: id },
        { $set: { votes } },
        { new: true }
      );
    },
    singleUpload(_, { file }) {
      fs.rename(file.path, "/your/upload/" + file.name, function(err) {
        console.log("uploaded: " + file.name);
        if (err) {
          console.log(err);
        }
      });
      return { ...file };
    },
    multipleUpload(_, { files }) {
      files.map(file => console.log(`uploaded size is ${file.size}`));
      return [...files];
    },
    openGraph: (root, { url }) => {
      return fetchOpenGraphByUrl(url)
        .then(data => {
          const { data: { ...obj } } = data;
          return obj;
        })
        .catch(err => console.log(err));
    }
  },
  Subscription: {
    postAdded: {
      subscribe: withFilter(
        () => {
          logger.info("post subscribed!");
          return pubsub.asyncIterator("postAdded");
        },
        payload => {
          logger.debug("new post", payload);
          return true;
        }
      )
    }
  },
  UserToken: {
    user(userToken) {
      return UserModel.findById(userToken.userId);
    }
  }
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

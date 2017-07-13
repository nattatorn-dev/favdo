export default {
  example: (state = {}, { type }) => {
    switch (type) {
      case 'EXAMPLE_ACTION':
        return {
          ...state
        }
      default:
        return state
    }
  }
}

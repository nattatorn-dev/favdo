import hoistNonReactStatic from 'hoist-non-react-statics'
import React from 'react'

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export default function mutatable({ mutationName = 'mutate' } = {}) {
  return SourceComponent => {
    class Mutatable extends React.Component {
      state = {
        loading: false,
        error: '',
        data: {},
      }

      submit = (event, variables, { handleError, handleSuccess } = {}) => {
        event && event.preventDefault()

        this.setState({ loading: true, error: '' })

        this.props
          [mutationName]({ variables })
          .then(({ data }) => {
            console.log(`[${Mutatable.displayName}] Successful!`)
            this.setState({ loading: false, data })
            if (handleSuccess) {
              handleSuccess()
            }
          })
          .catch(error => {
            console.error(`[${Mutatable.displayName}] Failed!`, error)
            this.setState({ loading: false, error: error.message, data: {} })
            if (handleError) {
              handleError()
            }
          })
      }

      render() {
        return (
          <SourceComponent
            {...this.props}
            loading={this.state.loading}
            error={this.state.error}
            data={this.state.data}
            submit={this.submit}
          />
        )
      }
    }

    Mutatable.displayName = `Mutatable(${getDisplayName(SourceComponent)})`
    hoistNonReactStatic(Mutatable, SourceComponent)
    return Mutatable
  }
}

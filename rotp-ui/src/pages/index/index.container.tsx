import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { Container, Row, Col, Alert } from 'reactstrap'

import { RequestResults, IRequestResultsAction } from './index.actions'
import { ITestResult } from '../../shared/models/test-result'
import { IAppState } from '../../store'

import ResultsTable from './results-table/results-table.component'
import CaseBuilder from './case-builder/case-builder.component'

export interface Props {
  error: string | null,
  loading: boolean,
  results: ITestResult[]

  requestResults (fileContents: string): void
}

export class IndexContainer extends React.Component<Props, object> {
  render () {
    const { error, loading, requestResults, results } = this.props

    return (
      <Container className={'mt-4'}>
        <Row>
          <Col>
            <h3>
              RotP Client
            </h3>
            <p>
              This is a companion app to the lambda I created for the Revenge of the Pancake's challenge. It allows you
              to upload your own test case and run it against the lambda.
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <ResultsTable error={error} results={results} loading={loading}/>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <CaseBuilder loading={loading} onSubmit={requestResults}/>
          </Col>
          <Col md={6}>
            <h3>Instructions</h3>
            <p>Simply upload a file that matches the example provided by the exercise. We'll read the contents of that
            file and base64 encode it for the lambda.</p>
            <p>The example file should follow the following format:</p>
            <Alert color={'secondary'}>
              5<br />
              -<br />
              -+<br />
              +-<br />
              +++<br />
              --+-
            </Alert>
          </Col>
        </Row>
      </Container>
    )
  }
}

export const mapStateToProps = (state: IAppState) => {
  return {
    error: state.testResults.error,
    loading: state.testResults.loading,
    results: state.testResults.results
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<IRequestResultsAction>) => {
  return {
    requestResults: (fileContents: string) => { dispatch(RequestResults(fileContents)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexContainer)

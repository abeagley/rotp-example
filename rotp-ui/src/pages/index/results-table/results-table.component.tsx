import * as React from 'react'

import { ITestResult } from '../../../shared/models/test-result'
import { Table, Alert } from 'reactstrap'

import './results-table.css'

export interface Props {
  error: string | null
  loading: boolean
  results: ITestResult[]
}

export default ({ error = null, loading = false, results = [] }: Props) => {
  const loadingSpinner = (loading)
    ? (<tr><td className={'text-center'} colSpan={3}><i className={'fa fa-spin fa-spinner'} /></td></tr>) : null

  let content: JSX.Element[] = []
  if (!loading && results.length === 0) {
    content = [
      (<tr className={'text-center'}><td colSpan={3}>No results to show! Try submitting a test file.</td></tr>)
    ]
  } else {
    content = results.map(result => (
      <tr key={result.testNumber}>
        <td>{result.testNumber}</td>
        <td>{result.testPattern}</td>
        <td>{result.result}</td>
      </tr>
    ))
  }

  let errorAlert = (error !== null) ? (<Alert color={'danger'}>Something went wrong. Sorry!</Alert>) : null

  return (
    <div>
      {errorAlert}
      <Table striped={true} bordered={true}>
        <thead>
          <tr>
            <th className={'test-id'}>#</th>
            <th>Pattern</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody className={'tbody-scroll'}>
          {loadingSpinner}
          {content}
        </tbody>
      </Table>
    </div>
  )
}

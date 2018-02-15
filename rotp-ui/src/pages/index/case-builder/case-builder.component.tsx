import * as React from 'react'

import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import './case-builder.css'

export interface Props {
  loading: boolean
  onSubmit (contents: string): void
}

export interface State {
  preview: string
}

export default class CaseBuilderComponent extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      preview: ''
    }
  }

  handleFileChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) {
      return
    }

    const userFile = evt.target.files.item(0)
    const reader = new FileReader()

    // Type issue with FileReader for now:
    // https://github.com/Microsoft/TypeScript/issues/4163
    reader.onloadend = (evt: any) => {
      this.setState({
        preview: evt.target.result
      })
    }

    reader.readAsText(userFile, 'utf8')
  }

  handleSubmit = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault()

    this.props.onSubmit(this.state.preview)
  }

  render () {
    const { loading } = this.props
    const { preview } = this.state
    const submitBtn = (preview !== '')
      ? (<Button onClick={this.handleSubmit} color={'success'} disabled={loading}>Submit</Button>)
      : null

    return (
      <Form>
        <FormGroup>
          <Label>Upload a test case.</Label>
          <Input
            type={'file'}
            onChange={this.handleFileChange}
            disabled={loading}
            multiple={false}
            accept={'text/plain'}
          />
        </FormGroup>
        <FormGroup>
          <Label>Preview</Label>
          <Input type={'textarea'} disabled={true} className={'i-text-area'} value={preview}/>
        </FormGroup>
        <FormGroup className={'text-right'}>
          {submitBtn}
        </FormGroup>
      </Form>
    )
  }
}

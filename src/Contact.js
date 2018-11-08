import React, { Component } from 'react';
import {
  Form
} from 'react-bootstrap'

class Contact extends Component {
  render() {
    return(
      <div>
        <Form>
          <div class="form-group">
            <label for="inputEmail" class="col-lg-2 control-label">Plz answer ur Email for updates</label>
            <div class="col-lg-10">
              <input type="text" class="form-control" id="inputEmail" placeholder="Email"></input>
            </div>
          </div>
          <button type="submit" class="btn btn-primary center-block">Submit</button>
        </Form>
      </div>

    )
  }
}

export default Contact

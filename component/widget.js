import React from 'react'
import { getRandom, dayHelper } from '../helpers/constans'
export default class Widget extends React.Component {
  /**
   * Set default state element based on props
   * @param {any} props
   */
  constructor(props) {
    super(props)

    this.state = {
      timezone: this.props.now.timezone,
      reason: this.props.initialReason
    }
  }

  /**
   * On props change update state
   * @param {any} nextProps
   * @return void
   */
  componentDidUpdate(nextProps) {
    if (nextProps.now.timezone !== this.state.timezone) {
      this.setState({
        timezone: nextProps.now.timezone,
        reason: getRandom(this.getReasons())
      })
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onSpacePressOrClick)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onSpacePressOrClick)
  }

  /**
   * On hitting Space reload reasons
   * @return void
   */
  onSpacePressOrClick = (event) => {
    if (event.type === 'click' || event?.keyCode == 32) {
      let reasons = this.getReasons()
      this.setState({ reason: getRandom(reasons) })
    }
  }

  /**
   * Get reasons according to current time
   * @return string[]
   */
  getReasons() {
    return dayHelper(this.props.now)
  }

  /**
   * Get reasons according to current time
   * @param {string} reason
   * @return void
   */
  parseReason(reason) {
    if (reason.endsWith('.jpeg')) {
      // eslint-disable-next-line @next/next/no-img-element
      return <img className="" alt="" src={reason} />
    }

    if (reason.includes('youtube.com/embed')) {
      return (
        <iframe
          width="560"
          height="315"
          src={reason}
          title="YouTube video player"
          frameborder="0"
          allowfullscreen
        />
      )
    }

    return reason
  }

  /**
   * Render widget
   * @return JSX.Element
   */
  render() {
    return (
      <div className="item">
        <h3 className="tagline">¿Puedo deployar?</h3>
        <div id="text" className="reason">
          {this.parseReason(this.state.reason)}
        </div>
        <span id="reload" onClick={this.onSpacePressOrClick}>
          <span className="space-btn">Espacio</span> o Click
        </span>
      </div>
    )
  }
}

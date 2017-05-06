'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var PropTypes = require('prop-types');

var Swipe = function (_React$Component) {
    _inherits(Swipe, _React$Component);

    function Swipe() {
        _classCallCheck(this, Swipe);

        var _this = _possibleConstructorReturn(this, (Swipe.__proto__ || Object.getPrototypeOf(Swipe)).call(this));

        _this.state = {
            x: 0,
            y: 0,
            status: false,
            detected: false,
            delta: 50,
            preventDefaultEvent: false
        };
        _this.moveStart = _this._moveStart.bind(_this);
        _this.move = _this._move.bind(_this);
        _this.moveEnd = _this._moveEnd.bind(_this);
        return _this;
    }

    _createClass(Swipe, [{
        key: 'render',
        value: function render() {
            var newProps = {
                onTouchStart: this.moveStart,
                onTouchMove: this.move,
                onTouchEnd: this.moveEnd,
                className: this.props.className || null,
                style: this.props.style || {}
            };
            if (this.props.mouseSwipe) {
                newProps.onMouseMove = this.move;
                newProps.onMouseDown = this.moveStart;
                newProps.onMouseUp = this.moveEnd;
            }
            return React.createElement(this.props.nodeName || 'div', newProps, this.props.children);
        }
    }, {
        key: '_moveStart',
        value: function _moveStart(e) {
            if (this.props.preventDefaultEvent) e.preventDefault();
            var X = Math.abs(e.clientX).toFixed(2) || Math.round(e.touches[0].clientX).toFixed(2);
            var Y = Math.abs(e.clientY).toFixed(2) || Math.round(e.touches[0].clientY).toFixed(2);

            this.setState({
                x: X,
                y: Y,
                status: true,
                detected: false
            });
        }
    }, {
        key: '_move',
        value: function _move(e) {
            if (this.state.status) {
                var x = Math.abs(e.clientX).toFixed(2) || Math.round(e.touches[0].clientX).toFixed(2);
                var y = Math.abs(e.clientY).toFixed(2) || Math.round(e.touches[0].clientY).toFixed(2);

                var tX = parseFloat((x - this.state.x).toFixed(2));
                var tY = parseFloat((y - this.state.y).toFixed(2));

                if (Math.abs(tX) > Math.abs(tY) && this.props.onSwipe) this.props.onSwipe([tX, 0]);else if (Math.abs(tX) < Math.abs(tY) && this.props.onSwipe) this.props.onSwipe([0, tY]);

                if (Math.abs(tX) >= this.props.delta) {
                    if (tX > this.props.delta) this.props.onSwipingRight(tX);else if (tX < -this.props.delta) this.props.onSwipingLeft(tX);
                } else if (Math.abs(tY) >= this.props.delta) {
                    if (tY > this.props.delta) this.props.onSwipingDown(tY);else if (tY < -this.props.delta) this.props.onSwipingUp(tY);
                }

                if (!this.state.detected) {
                    if (Math.abs(parseFloat(tX)) >= this.props.delta) {
                        if (parseFloat(tX) > this.props.delta) {
                            this.props.onSwipedRight(true);
                            this.setState({ detected: true });
                        } else if (parseFloat(tX) < -this.props.delta) {
                            this.props.onSwipedLeft(true);
                            this.setState({ detected: true });
                        }
                    } else if (Math.abs(parseFloat(tY)) >= this.props.delta) {
                        if (parseFloat(tY) > this.props.delta) {
                            this.props.onSwipedDown(true);
                            this.setState({ detected: true });
                        } else if (parseFloat(tY) < -this.props.delta) {
                            this.props.onSwipedUp(true);
                            this.setState({ detected: true });
                        }
                    }
                }
            }
        }
    }, {
        key: '_moveEnd',
        value: function _moveEnd(e) {
            if (this.props.preventDefaultEvent) e.preventDefault();
            this.setState({
                x: 0,
                y: 0,
                status: false,
                detected: false
            });
        }
    }]);

    return Swipe;
}(React.Component);

Swipe.defaultProps = {
    delta: 50,
    mouseSwipe: false,
    preventDefaultEvent: true,

    onSwipe: function onSwipe() {},
    onSwipingUp: function onSwipingUp() {},
    onSwipingRight: function onSwipingRight() {},
    onSwipingDown: function onSwipingDown() {},
    onSwipingLeft: function onSwipingLeft() {},
    onSwipedUp: function onSwipedUp() {},
    onSwipedRight: function onSwipedRight() {},
    onSwipedDown: function onSwipedDown() {},
    onSwipedLeft: function onSwipedLeft() {}
};

Swipe.propTypes = {
    nodeName: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,

    delta: PropTypes.number,
    mouseSwipe: PropTypes.bool,
    preventDefaultEvent: PropTypes.bool,

    onSwipe: PropTypes.func,
    onSwipingUp: PropTypes.func,
    onSwipingRight: PropTypes.func,
    onSwipingDown: PropTypes.func,
    onSwipingLeft: PropTypes.func,
    onSwipedUp: PropTypes.func,
    onSwipedRight: PropTypes.func,
    onSwipedDown: PropTypes.func,
    onSwipedLeft: PropTypes.func
};

exports.default = Swipe;
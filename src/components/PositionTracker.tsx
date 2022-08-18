import * as React from 'react';

interface NativeImage {
  offsetHeight: number;
  offsetWidth: number;
  naturalHeight: number;
  naturalWidth: number;
}

interface Image {
  height: number;
  width: number;
  naturalHeight: number;
  naturalWidth: number;
}

interface State {
  image: Image | null;
  imageLoaded: boolean;
}

interface Props {
  src: string;
  submit: any;
  setCursorPosition: any;
  elementDimensions?: { width: number; height: number };
  position?: { x: number; y: number };
  disable?: boolean;
}

class PositionTracker extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      image: null,
      imageLoaded: false,
    };
  }

  private onImgLoad = (event: any) => {
    // console.log(JSON.stringify(event))
    const img: NativeImage = event.target as NativeImage;

    console.log(
      `
      Loading image:

      offset: H ${img.offsetHeight} W ${img.offsetWidth}
      natural: H ${img.naturalHeight} W ${img.naturalWidth}
    `
    );
    this.setState({
      image: {
        height: img.offsetHeight,
        width: img.offsetWidth,
        naturalHeight: img.naturalHeight,
        naturalWidth: img.naturalWidth,
      },
      imageLoaded: true,
    });
  };

  componentWillReceiveProps(nextProps: Props) {
    // image has changed, set to not loaded and let onImgLoad set to true
    if (nextProps.src !== this.props.src) {
      this.setState({
        imageLoaded: false,
      });
    }

    // debounced in Home this.setCursorPosition
    if (
      this.state.imageLoaded &&
      !this.props.disable &&
      this.props.position &&
      nextProps.position &&
      nextProps.elementDimensions &&
      (this.props.position.x !== nextProps.position.x ||
        this.props.position.y !== nextProps.position.y)
    ) {
      this.props.setCursorPosition({
        x: nextProps.position.x,
        y: nextProps.position.y,
        width: nextProps.elementDimensions.width,
        image: this.state.image,
      });
    }
  }

  public render() {
    const {
      // detectedEnvironment: {
      //   isMouseDetected = false,
      //   isTouchDetected = false
      // } = {},
      elementDimensions: { width = 0, height = 0 } = {},
      position: { x = 0, y = 0 } = {},
      // isActive = false,
      // isPositionOutside = false,
      submit,
    } = this.props;

    const onSubmit = () =>
      submit({ x, y, width, height, image: this.state.image });

    return (
      <img
        alt="problem loading img passed to PositionTracker"
        src={this.props.src}
        onClick={onSubmit}
        onLoad={this.onImgLoad}
        style={{
          opacity: this.props.disable || !this.state.imageLoaded ? 0.5 : 1,
        }}
      />
    );
  }
}

export default PositionTracker;

interface VideoPlayerProps {
  videoUrl: string;
  onEnded?: () => void;
  onError?: (e: React.SyntheticEvent<HTMLVideoElement, Event>) => void;
  styles?: React.CSSProperties;
}

const VideoPlayer = ({ videoUrl, onEnded, onError, styles }: VideoPlayerProps) => (
  <video autoPlay playsInline preload="auto" onEnded={onEnded} onError={onError} style={styles}>
    <source src={videoUrl} type="video/webm" />
    <source src={videoUrl.replace(".webm", ".mp4")} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
);

export default VideoPlayer;

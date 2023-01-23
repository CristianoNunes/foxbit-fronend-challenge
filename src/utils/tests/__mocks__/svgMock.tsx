export default 'SvgURL';

interface ImageProps {
  width: string;
  height: string;
}

export const ReactComponent = ({ width, height }: ImageProps) => (
  <div>
    w-{width} h-{height}
  </div>
);

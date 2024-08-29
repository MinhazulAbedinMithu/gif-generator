/* eslint-disable react/prop-types */
const GifPreview = ({ gifUrl }) => {
  return (
    <div>
      <img src={gifUrl} alt="Generated GIF" />
      <a href={gifUrl} download="generated.gif">
        Download GIF
      </a>
    </div>
  );
};

export default GifPreview;

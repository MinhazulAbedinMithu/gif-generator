/* eslint-disable react/prop-types */
const GifTemplateSelector = ({ onSelect }) => {
  const templates = [
    { id: 1, name: "Highway", src: "path_to_highway_template.gif" },
    { id: 2, name: "City", src: "path_to_city_template.gif" },
  ];

  return (
    <div>
      {templates.map((template) => (
        <div
          id={`template-${template.id}`}
          key={template.id}
          onClick={() => onSelect(template)}
          className="template-container"
        >
          <img src={template.src} alt={template.name} />
        </div>
      ))}
    </div>
  );
};

export default GifTemplateSelector;

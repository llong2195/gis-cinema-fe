import * as React from "react";

function CityInfo(props) {
  const { info } = props;
  const displayName = `${info.name}, ${info.description}`;

  return (
    <div style={{ width: 470 }}>
      
      <div style={{ textAlignLast: "center" }}>
        <img width={240} src={info.image} />
      </div>
      <div style={{ overflowWrap: "anywhere" }}>
        <div style={{ color: "#fff", display: "flex", flexWrap: "wrap" }}>
          <p style={{ color: "#050b95", fontWeight: "bold" }}>Tên rạp:</p>
          <p style={{ marginLeft: 6 }}>
            {info.name}({info.title})
          </p>
        </div>
        <div style={{ color: "#fff", display: "flex", flexWrap: "wrap" }}>
          <p
            style={{
              marginBottom: 0,
              marginTop: 0,
              color: "#050b95",
              fontWeight: "bold",
            }}
          >
            Review:
          </p>
          <p style={{ marginTop: 0 }}>{info.description}</p>
        </div>
      </div>
    </div>
  );
}

export default React.memo(CityInfo);

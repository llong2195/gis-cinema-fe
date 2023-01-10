import * as React from "react";
import { Form, Input, Label, Row, Col, Button } from "reactstrap";
import {
  updateCinema,
  deleteCinema,
} from "../helpers/app_backend/cinema-backend-helper";
import { uploadCloud } from "../helpers/app_backend/file-backend-helper";
import { Icon } from "@iconify/react";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
function CityInfo(props) {
  const { info, setIsEdit, setPopupInfo, isEdit, fetchCinemas } = props;
  const displayName = `${info.name}, ${info.description}`;
  const [imgCinema, setImgCinema] = React.useState(null);
  const [dataCinema, setDataCinema] = React.useState({});
  const [dataImg, setDataImg] = React.useState(null);
  const onImageChange = (event) => {
    setDataImg(event.target.files[0]);
    setImgCinema(URL.createObjectURL(event.target.files[0]));
  };

  const handleSubmit = async (e) => {
    if (imgCinema) {
      const formData = new FormData();
      formData.append("file", dataImg);
      await uploadCloud(formData).then(async (res) => {
        const dataCreate = {
          name: dataCinema.name,
          title: dataCinema.title,
          image: res.body.originUrl2,
          description: dataCinema.description,
          latitude: dataCinema.latitude,
          longitude: dataCinema.longitude,
        };
        await updateCinema(dataCinema.id, dataCreate).then(async (response) => {
          await fetchCinemas();
          setIsEdit(false);
          setDataCinema({});
        });
      });
    } else {
      const dataCreate = {
        name: dataCinema.name,
        title: dataCinema.title,
        image: dataCinema.image,
        description: dataCinema.description,
        latitude: dataCinema.latitude,
        longitude: dataCinema.longitude,
      };
      await updateCinema(dataCinema.id, dataCreate).then(async (response) => {
        await fetchCinemas();
        setIsEdit(false);
      });
    }
  };
  const onDeleteHandler = async () => {
    await deleteCinema(info.id).then(async (response) => {
      await fetchCinemas();
      setIsEdit(false);
      setPopupInfo(null);
    });
  };
  React.useEffect(() => {
    setDataCinema({});
  }, [info]);
  return (
    <div>
      {console.log(isEdit)}
      {!isEdit ? (
        <div style={{ width: 470 }}>
          <div style={{ textAlignLast: "center" }}>
            <img width={240} src={dataCinema.image || info.image} />
          </div>
          <div style={{ overflowWrap: "anywhere" }}>
            <div style={{ color: "#fff", display: "flex", flexWrap: "wrap" }}>
              <p style={{ color: "#050b95", fontWeight: "bold" }}>Tên rạp:</p>
              <p style={{ marginLeft: 6 }}>
                {dataCinema.name || info.name}({dataCinema.title || info.title})
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
              <p style={{ marginTop: 0 }}>
                {dataCinema.description || info.description}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <Form
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: 217,
                maxHeight: 430,
                height: "max-content",
                width: 300,
              }}
              onSubmit={(e) => {
                e.preventDefault();
                // handleSubmit(e);
                return false;
              }}
            >
              <div
                className="mb-3"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Label className="form-label" style={{ color: "#fff" }}>
                  Cinema Name
                </Label>
                <Input
                  type="text"
                  placeholder="Cinema Name"
                  name="cinemaName"
                  style={{ borderRadius: 4, height: 26, border: "#fff" }}
                  value={dataCinema.name}
                  onChange={(e) =>
                    setDataCinema({ ...dataCinema, name: e.target.value })
                  }
                />
              </div>
              <div
                className="mb-3"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <Label className="form-label" style={{ color: "#fff" }}>
                  Cinema Title
                </Label>
                <Input
                  type="text"
                  placeholder="Cinema Title"
                  name="cinemaName"
                  style={{ borderRadius: 4, height: 26, border: "#fff" }}
                  value={dataCinema.title}
                  onChange={(e) =>
                    setDataCinema({ ...dataCinema, title: e.target.value })
                  }
                />
              </div>
              <div
                className="mb-3"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <Label className="form-label" style={{ color: "#fff" }}>
                  Description
                </Label>
                <Input
                  type="textarea"
                  height={128}
                  placeholder="Description"
                  name="cinemaDescription"
                  style={{ borderRadius: 4, border: "#fff", height: 100 }}
                  value={dataCinema.description}
                  onChange={(e) =>
                    setDataCinema({
                      ...dataCinema,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div
                className="mb-3"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <Input type="file" name="cinemaImg" onChange={onImageChange} />
              </div>
              <img
                src={imgCinema || dataCinema.image}
                width={200}
                style={{
                  alignSelf: "center",
                  marginTop: 24,
                  minHeight: 100,
                  maxHeight: 113,
                  height: "max-content",
                }}
              />
            </Form>
          </div>
        </div>
      )}
      <Button
        style={{
          width: 80,
          height: 26,
          borderRadius: 7,
          color: "#76a3fc",
          background: "#fff",
          border: "#fff",
          marginTop: 20,
        }}
        onClick={() => {
          !isEdit ? (setIsEdit(true), setDataCinema(info)) : handleSubmit();
        }}
      >
        Edit
      </Button>
      {!isEdit ? (
        <Button
          style={{
            background: "transparent",
            color: "red",
            border: "none",
            marginLeft: 333,
          }}
          onClick={onDeleteHandler}
        >
          <Icon icon="mdi:trash-can" color="red" width={24} height={24} />
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default React.memo(CityInfo);

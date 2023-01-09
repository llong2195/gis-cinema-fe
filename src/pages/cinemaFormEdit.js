import * as React from "react";
import { Form, Input, Label, Row, Col, Button } from "reactstrap";
import { createCinema } from "../helpers/app_backend/cinema-backend-helper";
import { uploadCloud } from "../helpers/app_backend/file-backend-helper";
function CinemaForm({ latitude, longitude, fetchCinemas, setPopupForm }) {
  const [imgCinema, setImgCinema] = React.useState(null);
  const onImageChange = (event) => {
    // setDataCinema({
    //     ...dataCinema,
    //     cinemaImg: event.target.files[0].filename
    // })
    setImgCinema(URL.createObjectURL(event.target.files[0]));
  };

  const [dataCinema, setDataCinema] = React.useState({});
  React.useEffect(() => {
    setImgCinema(null);
    setDataCinema({
      ...dataCinema,
      name: "",
      title: "",
      image: "",
      description: "",
      latitude: latitude,
      longitude: longitude,
    });
  }, [latitude, longitude]);

  const handleSubmit = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target["cinemaImg"].files[0]);
    await uploadCloud(formData).then(async (res) => {
      const dataCreate = {
        name: dataCinema.name,
        title: dataCinema.title,
        image: res.body.originUrl2,
        description: dataCinema.description,
        latitude: dataCinema.latitude,
        longitude: dataCinema.longitude,
      };
      await createCinema(dataCreate).then((response) => {
        fetchCinemas();
        setPopupForm(false);
      });
    });
  };
  return (
    <div>
      <div>
        <Form
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: 217,
            maxHeight: 400,
            height: "max-content",
            width: 300,
          }}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
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
              style={{ borderRadius: 4, border: "#fff", height: 128 }}
              value={dataCinema.description}
              onChange={(e) =>
                setDataCinema({ ...dataCinema, description: e.target.value })
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
            <Input
              type="file"
              name="cinemaImg"
              onChange={onImageChange}
              value={dataCinema.cinemaImg}
            />
          </div>
          <img
            src={imgCinema}
            width={200}
            style={{ alignSelf: "center", marginTop: 24 }}
          />

          <Row style={{ textAlign: "center" }}>
            <Col>
              <div className="text-end">
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
                  type="submit"
                  className="btn btn-success save-user"
                >
                  Save
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}

export default React.memo(CinemaForm);

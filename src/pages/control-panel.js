import * as React from "react";
import { Form, Label, Input, Button } from "reactstrap";
import { findARound } from "../helpers/app_backend/cinema-backend-helper";

function ControlPanel({ onClickItemSearchHandler, userLocation }) {
  const [dataSearch, setDataSearch] = React.useState([]);
  const handleSubmit = async (e) => {
    const dataFilter = {
      name: e.target["search"].value,
    };
    await findARound(dataFilter).then((response) => {
      setDataSearch(response.body);
    });
  };

  const searchNearBy = async (e) => {
    await findARound(userLocation).then((response) => {
      setDataSearch(response.body);
    });
  };
  return (
    <div className="control-panel">
      <div>
        <div
          style={{
            textAlignLast: "center",
            borderBottom: "1px solid #ccc",
            padding: 9,
          }}
        >
          <Button
            style={{
              width: 160,
              height: 26,
              borderRadius: 7,
              color: "#76a3fc",
              background: "#fff",
              border: "#fff",
            }}
            type="submit"
            className="btn btn-success save-user"
            onClick={searchNearBy}
          >
            Tìm xung quanh bạn
          </Button>
        </div>
        <Form
          style={{
            width: 334,
            display: "flex",
            justifyContent: "space-between",
          }}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
            return false;
          }}
        >
          <div>
            <Label>Search</Label>
            <Input
              type={"text"}
              placeholder="Search cinema"
              name="search"
              style={{
                marginLeft: 20,
                height: 23,
                borderRadius: 3,
                width: 232,
                border: "none",
              }}
            />
          </div>
          <Button
            style={{
              width: 80,
              height: 26,
              borderRadius: 7,
              color: "#76a3fc",
              background: "#fff",
              border: "#fff",
              marginTop: 25,
            }}
            type="submit"
            className="btn btn-success save-user"
          >
            Save
          </Button>
        </Form>
      </div>
      {dataSearch.length > 0 ? (
        <div style={{ marginTop: 20 }}>
          {dataSearch.map((item) => (
            <div
              style={{
                borderTop: "1px solid black",
                padding: 10,
                display: "flex",
              }}
              onClick={() => {
                onClickItemSearchHandler(item);
              }}
            >
              <div>
                <div
                  style={{
                    textOverflow: "ellipsis",
                    width: 180,
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    color: "black",
                  }}
                >{`Rạp: ${item.name} (${item.title})`}</div>
                <div
                  style={{
                    color: "#5d5dc0",
                    overflowWrap: "anywhere",
                    height: 108,
                    overflow: "hidden",
                    width: 180,
                    textOverflow: "ellipsis",
                  }}
                >{`Review: ${item.description}`}</div>
              </div>

              <img width={200} src={item.image} />
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default React.memo(ControlPanel);

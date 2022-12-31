import * as React from 'react';
import { Input } from "reactstrap"
function CinemaForm() {

    return (
        <div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <label>
                    Cinema Name
                </label>
                <Input type="text" name="cinemaName" />
                <label>
                    Cinema Description
                </label>
                <Input type="textarea" name="cinemaDescription" />
            </div>
            <Input type="file" name="cinemaImg" />
        </div>
    );
}

export default React.memo(CinemaForm);

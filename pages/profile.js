import React from "react";
import { useContextApi } from "../Context/contextApi";

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";

export default function Profile() {
  const { user } = useContextApi();
  return (
    <div className="vh-100" style={{ backgroundColor: "#9de2ff" }}>
      <MDBContainer>
        <MDBRow className="justify-content-center">
          <MDBCol md="9" lg="7" xl="5" className="mt-5">
            <MDBCard style={{ borderRadius: "15px" }}>
              <MDBCardBody className="p-4">
                <div className="d-flex">
                  <div>
                    <MDBCardImage
                      style={{ width: "180px", borderRadius: "10px" }}
                      src="https://github.com/mdo.png"
                      alt="Generic placeholder image"
                      fluid
                    />
                  </div>
                  <div
                    className="center ml-5 mt-5"
                    style={{ justifyContent: "center", display: "flex" }}
                  >
                    <MDBCardTitle className="text-bold">
                      {user !== null ? user.email : ""}
                    </MDBCardTitle>
                    <MDBCardText className="text-bold">
                      {user !== null ? user.password : ""}
                    </MDBCardText>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

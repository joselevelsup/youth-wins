import React from "react";
import deleteIcon from "../assets/delete.png";
import { Row, Col, Button } from "reactstrap";
import { shorten } from "../util/helpers"

export const ResourceItem = ({ resource, deleteResource, openResource, apply, admin, full }) => {
    return (
        <React.Fragment>
          <Col md={full ? {size:6, offset: 2} : 6} className="resourceItem">
                <div className="media">
                  <React.Fragment>
                    {
                        resource.logo ?

                        <img className="align-self-center rounded-circle logo" onClick={() => openResource(resource)} width="128" height="128" src={resource.logo} />
                        :
                        <div className="col-2 align-self-center" onClick={() => openResource(resource)}> <div className="rounded-circle logo"></div></div>
                    }
                  </React.Fragment>
                  <div className={`media-body align-self-center ${resource.pending && "pending" }`}>
                        <div className="row">
                            <div className="offset-1 col-7">
                                <div className="row">
                                    <div className="col-12">
                                        <h5 className="ml-4">{resource.organizationName}</h5>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <p className="ml-5">{shorten(resource.description, 100, true)}</p>
                                    </div>
                                </div>
                            </div>
                            {
                                (resource && admin) &&
                                <div className="col-2 align-self-center">
                                    <Button color="clear" className="rounded-circle" onClick={() => deleteResource(resource._id)}><img src={deleteIcon} width="60" height="60" /></Button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </Col>
            {
                full &&
                <Col md={2} className="text-center align-self-center">
                    <Button className="left-right-rounded" block size="lg" color="primary" onClick={() => apply(resource._id)}>Apply</Button>
                    <div className="w-100"></div>
                    <Button color="link" onClick={() => openResource(resource)}>More</Button>
                </Col>
            }
        </React.Fragment>
    );
}

export const StaffItem = ({ staff, deleteStaff, openStaff}) => {
    return (
        <Col md={4} className="userItem">
            <div className="media">

              <React.Fragment>
                {
                    staff.profile ?
                        <img className="align-self-center img-fluid rounded-circle profile" onClick={() => openStaff(staff)} src={staff.profile} />
                    :
                    <div className="col-2 align-self-center" onClick={() => openStaff(staff)}> <div className="rounded-circle profile"></div></div>
                }
              </React.Fragment>
                <div className="media-body">
                    <div className="row">
                        <div className="col-8 align-self-center">
                            <h5><span className="ml-4 align-center">{staff.firstName} {staff.lastName}</span></h5>
                        </div>
                        <div className="col-2 align-self-center">
                            <Button color="clear" className="rounded-circle" onClick={() => deleteStaff(staff._id)}><img src={deleteIcon} width="50" height="50" /></Button>
                        </div>
                    </div>
                </div>
            </div>
        </Col>
    );
}

export const UserItem = ({ user, deleteUser, openUser }) => {
    return (
        <Col md={4} className="userItem">
          <div className="media">
            <React.Fragment>
              {
                  user.profile ?
                      <img className="align-self-center img-fluid rounded-circle profile" onClick={() => openUser(user)} src={user.profile} />
                  :
                  <div className="col-2 align-self-center" onClick={() => openUser(user)}> <div className="rounded-circle profile"></div></div>
              }
            </React.Fragment>
                
                <div className="media-body">
                    <div className="row">
                        <div className="col-8 align-self-center">
                            <h5><span className="ml-4 align-center">{user.firstName} {user.lastName}</span></h5>
                        </div>
                        <div className="col-2 align-self-center">
                            <Button color="clear" className="rounded-circle" onClick={() => deleteUser(user._id)}><img src={deleteIcon} width="50" height="50" /></Button>
                        </div>
                    </div>
                </div>
            </div>
        </Col>
    );
}


export const AppItem = ({ status, resource, deleteApp, size,  openResource, appId }) => {
    return (
        <Col md={size} className="appItem">
          <div className="media">
             <div className="col-2 align-self-center" onClick={() => openResource(resource, status)}> <div className={status ?"rounded-circle profile filled": "rounded-circle profile"}></div></div>
            <div className="media-body">
              <div className="row">
                <div className="col-8 align-self-center">
                  <div className="align-middle">
                    <h5><span className="ml-4 align-middle">{resource.organizationName}</span></h5>
                  </div>
                </div>
                <div className="col-2 align-self-center">
                  <Button color="clear" className="rounded-circle" onClick={() => deleteApp(appId)}><img src={deleteIcon} width="50" height="50" /></Button>
                </div>
              </div>
            </div>
          </div>
        </Col>
    );
}

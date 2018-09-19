import React from "react";
import deleteIcon from "../assets/delete.png";
import Ionicon from "react-ionicons";
import { Row, Col, Button } from "reactstrap";
import { shorten } from "../util/helpers"

export const ResourceItem = ({ resource, deleteResource, openResource, apply, admin, full }) => {
    return (
        <React.Fragment>
          <Col md={6} className="resourceItem">
                <div className="media">
                  <React.Fragment>
                    {
                        resource.logo ?
                            <div className="col-4 align-self-center p-0">
                              <div className="image-thumb">
                                <img className="img-fluid logo" onClick={() => openResource(resource)} src={resource.logo} />
                              </div>
                            </div>
                        :
                        <div className="align-self-center rounded-circle logo " onClick={() => openResource(resource)}></div>
                    }
                  </React.Fragment>
                  <div className={`media-body align-self-center ${resource.pending ? "pending" : "" }`}>
                        <div className="row h-100">
                           <div className={full ? "offset-1 col-6" : "offset-1 col-7"}>
                                <div className="row">
                                    <div className="col-12">
                                      <h5 className="push-words clickable" onClick={() => openResource(resource)} >{resource.organizationName}</h5>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <p className="push-words">{shorten(resource.description, 100, true)}</p>
                                    </div>
                                </div>
                            </div>
                          {
                              full &&
                                  <Col md={4} className="text-center align-self-center">
                                    <Button className="left-right-rounded" block  color="primary" onClick={() => apply(resource._id)}>Apply</Button>
                                    <div className="w-100"></div>
                                    <Button color="link" onClick={() => openResource(resource)}>More</Button>
                                  </Col>
                          }
                            {
                                (resource && admin) &&
                                <div className="col-2 align-self-center">
                                  <button className="btn btn-remove rounded-circle mx-auto" onClick={() => deleteResource(resource._id)}><Ionicon icon="md-remove" fontSize="40px" color="#fff"/></button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </Col>
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
                          <h5><span className="ml-4 align-center clickable" onClick={() => openStaff(staff)}>{staff.firstName} {staff.lastName}</span></h5>
                        </div>
                        <div className="col-2 align-self-center">
                          <button className="btn btn-remove sm-remove rounded-circle mx-auto" onClick={() => deleteStaff(staff._id)}><Ionicon icon="md-remove" fontSize="40px" color="#fff"/></button>
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
                          <h5><span className="ml-4 align-center clickable" onClick={() => openUser(user)}>{user.firstName} {user.lastName}</span></h5>
                        </div>
                        <div className="col-2 align-self-center">
                          <button className="btn btn-remove sm-remove rounded-circle mx-auto" onClick={deleteUser}><Ionicon icon="md-remove" fontSize="40px" color="#fff"/></button>
                        </div>
                    </div>
                </div>
            </div>
        </Col>
    );
}


export const AppItem = ({ created, status, resource, deleteApp, size,  openResource, appId, user }) => {
    return (
        <Col md={size} className="appItem">
          <div className="media">
             <div className="col-2 align-self-center" onClick={() => openResource(resource, status, appId)}> <div className={status ?"rounded-circle profile filled": "rounded-circle profile unfilled"}></div></div>
            <div className="media-body">
              <div className="row">
                <div className="col-9 align-self-center">
                  <div className="text-center">
                     {user ? <h6><span className="ml-4 align-middle clickable" onClick={() => openResource(resource, status, appId, user, created)} >{resource.organizationName} - {user.firstName} {user.lastName} - {new Date(created).toLocaleDateString()}</span></h6> : <h6><span className="ml-4 align-middle clickable" onClick={() => openResource(resource, status, appId, user)} >{resource.organizationName}</span></h6> }
                  </div>
                </div>
                <div className="col-2 align-self-center">
                  <button className="btn btn-remove sm-remove rounded-circle mx-auto" onClick={() => deleteApp(appId)}><Ionicon icon="md-remove" fontSize="40px" color="#fff"/></button>
                </div>
              </div>
            </div>
          </div>
        </Col>
    );
}


export const TeamItem = ({ staff, shown, addToSite }) => {
    return (
        <Col md={4} className="teamItem">
          <div className="media">
            <React.Fragment>
              {
                  staff.profile ?
                      <img className="align-self-center img-fluid rounded-circle profile" src={staff.profile} />
                  :
                  <div className="col-2 align-self-center">
                    <div className="rounded-circle profile"></div>
                  </div>
              }
            </React.Fragment>
            <div className="media-body">
              <div className="row">
                <div className="col-8 align-self-center">
                  <h5><span className="ml-4 align-middle">{staff.firstName} {staff.lastName}</span></h5>
                </div>
                <div className="offset-1 col-1 align-self-center">
                  <div className="mt-1">
                    <div onClick={() => addToSite(staff._id)} className={shown ? "rounded-circle filled-2": "rounded-circle"}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
    )
}

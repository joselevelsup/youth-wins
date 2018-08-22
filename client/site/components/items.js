import React from "react";
import deleteIcon from "../assets/delete.png";
import { Col, Button } from "reactstrap";
import { shorten } from "../util/helpers"

export const ResourceItem = ({ resource, deleteResource, openResource, admin }) => {
    return (
        <Col md={6} className="resourceItem">
            <div className="media">
                <img className="align-self-center rounded-circle logo" onClick={() => openResource(resource)} width="128" height="128" src={resource.logo} />
                <div className="media-body align-self-center">
                    <div className="row">
                        <div className="offset-1 col-7">
                            <div className="row">
                                <div className="col-12">
                                    <h5 className="mt-0">{resource.organizationName}</h5>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <p>{shorten(resource.description, 100, true)}</p>
                                </div>
                            </div>
                        </div>
                        {
                            (resource && admin) &&
                            <div className="col-2 align-self-center">
                                <Button color="clear" className="rounded-circle" onClick={() => deleteResource(r._id)}><img src={deleteIcon} width="60" height="60" /></Button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </Col>
    );
}

export const StaffItem = ({ staff, deleteStaff, openStaff}) => {
    return (
        <Col md={4} className="userItem">
            <div className="media">
                <img className="align-self-center img-fluid rounded-circle profile" onClick={() => openStaff(staff)} src={staff.profile} />
                <div className="media-body">
                    <div className="row">
                        <div className="col-6 align-self-center">
                            <h5><span className="ml-4 align-center">{staff.firstName} {staff.lastName}</span></h5>
                        </div>
                        <div className="offset-2 col-2 align-self-center">
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
                <img className="align-self-center img-fluid rounded-circle profile" onClick={() => openUser(user)} src={user.profile} />
                <div className="media-body">
                    <div className="row">
                        <div className="col-6 align-self-center">
                            <h5><span className="ml-4 align-center">{user.firstName} {user.lastName}</span></h5>
                        </div>
                        <div className="offset-2 col-2 align-self-center">
                            <Button color="clear" className="rounded-circle" onClick={() => deleteUser(user._id)}><img src={deleteIcon} width="50" height="50" /></Button>
                        </div>
                    </div>
                </div>
            </div>
        </Col>
    );
}

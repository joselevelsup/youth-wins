import {
    API,
    API_RESOURCE,
    RESOURCES_S,
    RESOURCES_F,
    APPLY_S,
    APPLY_F,
    CREATED_RES_S,
    CREATED_RES_F,

} from "../constants/constants";

export const applySuccess = data => ({
    type: APPLY_S,
    payload: data
});

export const applyFail = err => ({
    type: APPLY_F,
    payload: err
});

export const applyResource = (id) => ({
    type: API,
    payload: {
        url: API_RESOURCE,
        data: {
            resourceId: id
        },
        method: "POST",
        success: applySuccess,
        error: applyFail
    }
});

export const gotResources = data => ({
    type: RESOURCES_S,
    payload: data
});

export const failedResources = err => ({
    type: RESOURCES_F,
    payload: err
});

export const fetchResources = () => ({
    type: API,
    payload: {
        url: API_RESOURCE,
        success: gotResources,
        error: failedResources
    }
})

export const createdResource = data => ({
	type: CREATED_RES_S,
	payload: data
})

export const failedCreateResource = err => ({
	type: CREATED_RES_F,
	payload: err
})

export const createResource = ({ organizationName, contactEmail, website, ethnicityServed,  description, logo, categories, stateServed }) => {
	const file = new FormData()
	logo && file.append('file', logo[0])
	file.append('data', JSON.stringify({
		organizationName, 
		contactEmail, 
		website, 
		ethnicityServed,  
		description, 
		logo, 
		categories, 
		stateServed
	}))

	return {
		type: API,
		payload: {
			url: API_RESOURCE+"/create-resource",
			method: 'POST',
			success: createdResource,
			error: failedCreateResource,
			data: file
		}
	}
} 

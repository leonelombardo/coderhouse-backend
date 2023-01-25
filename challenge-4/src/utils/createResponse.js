export const createResponse = (res, status, response) => {
    const isSuccess = status === 200 || status === 201 ? true : false

    return res.status(status).send({ status, success: isSuccess, error: !isSuccess, response})
}
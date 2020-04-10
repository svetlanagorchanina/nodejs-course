import { BaseError } from "../error";
import * as HttpStatus from "http-status-codes";

export function errorHandler(err, req, res, next) {
    if (err instanceof BaseError) {
        res.status(err.code).json(err);

        return;
    }

    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
}

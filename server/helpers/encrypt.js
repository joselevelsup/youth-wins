import crypto from "crypto";
import { v1 } from "uuid";

export default function(s){
    let secret = v1();

    let hash = crypto.createHmac(process.env.ENCRYPT, secret).update(s).digest("hex");

    return {
        encrypted: hash,
        key: secret
    };
}

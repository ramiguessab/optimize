import { readFile } from "fs";
import FirestoreRequest from "@/firebase/firestore";

readFile("hello.json", (err, file) => {
    const json = JSON.parse(file.toString());
    console.log(json);
    console.log(Object.keys(json).length);
});

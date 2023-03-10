import axios from 'axios';
import { toast } from "react-toastify";

const UseCreateAccount = (data) => {
    console.log("server post", data);
    // get all username 
    axios(`${process.env.REACT_APP_SERVER_URL}user/all/username`)
        .then(async res => {
            console.log("inner server post", res.data.result);

            // check username valid or not 
            const validUserName = res.data.result.includes(data.username)
            console.log(validUserName);

            if (!validUserName) {
                // post new user data in database
                console.log("enter", `${process.env.REACT_APP_SERVER_URL}user/create`);

                axios({
                    url: `${process.env.REACT_APP_SERVER_URL}user/create`,
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    data: data
                })
                    .then(res => {
                        toast.success("Create account Successfully")
                    })
                    .catch(err => toast.error("Create account field"))


            } else {
                toast.error("username not valid")
            }
        }).catch(err => {
            toast.error("Create account field")
            console.log("inner server post");

        })



};

export default UseCreateAccount;
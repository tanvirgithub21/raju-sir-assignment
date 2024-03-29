const express = require("express")
const mongoose = require("mongoose")
const route = express.Router()
const loginRecordSchema = require("../schemas/loginRecordSchema")

const User = new mongoose.model("user", loginRecordSchema)



const data = {
    admin: false, email: "tanvir.bd.global123@gmail.com", loginRecords: [], name: "Md. Tanvir Ahmed",
    time: "2023-03-14T21:15:08.260Z",
    username: "tom2@gfdmail.com", _id: "640d4609dcb5aee01b37f43b"
}


// user router
// Get all users
// sent data to params:- http://localhost:5000/users
route.get("/", async (req, res) => {
    console.log("enter root route");
    const allUsers = await User.find()
    try {
        if (allUsers) {
            res.status(200).json({
                message: "Find all users successfully",
                result: allUsers
            })
        } else {
            res.status(500).json({ error: "this is server side error" })
        }
    } catch {
        res.status(500).json({ error: "this is server side error" })

    }


})

// Get a single user
// sent data to params:- http://localhost:5000/user/id type hear...
route.get("/:email", async (req, res) => {
    const { email } = req.params
    try {
        const findUser = await User.findOne({ email: email })
        if (findUser) {
            res.status(200).json({
                message: "Find user successfully",
                result: findUser
            })
        } else {
            res.status(500).json({ error: "this is server side error" })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "this is server side error" })
    }

})

// Get all users username
// sent data to params:- http://localhost:5000/user/all/username
route.get("/all/username", async (req, res) => {
    console.log("enter user name route");
    const allUsers = await User.find()
    try {
        if (allUsers) {
            const allUserName = allUsers.map(user => user.username)
            res.status(200).json({
                message: "Find all Username successfully",
                result: allUserName
            })
        } else {
            res.status(500).json({ error: "this is server side error" })
        }
    } catch {
        res.status(500).json({ error: "this is server side error" })

    }

})

// create a single user
// sent data to body:- {...data}
route.post("/create", async (req, res) => {
    // all user get in mongodb server with mongoose
    try {
        const newUser = new User(req.body)
        const result = await newUser.save()
        if (!result) {
            res.status(500).json({ error: "this is server side error" })
        } else {
            res.status(200).json({
                result: {
                    email: result.email,
                    username: result.username
                },
                message: "Account create successfully",
            })
        }
    } catch {
        res.status(500).json({ error: "this is server side error" })
    }

})

// every time login track time track
// sent data to body:- {email: "tanvir@gmail.com",provider: "email || google"}
route.put("/login", (req, res) => {
    try {
        User.findOneAndUpdate(
            { email: req.body.email },
            {
                $push: {
                    loginRecords: {
                        provider: req.body.provider
                    }
                }
            },
            {
                upsert: true,
                new: true
            }
        )
            .then((user) => {
                res.status(200).json({
                    message: "Login successfully",
                    result: user,
                })
            })
            .catch((err) => {
                res.status(500).json({ error: "this is server side error" })
            });
    } catch {
        res.status(500).json({ error: "this is server side error" })
    }

})


//update the "admin" property of a user by their ID
// sent data to body:-{admin: "value"} params pass user ID http://localhost:5000/user/make-admin/ID
route.put("/make-admin/:id", (req, res) => {
    User.findByIdAndUpdate(req.params.id, { admin: !req.body.admin }, { new: true })
        .then(user => {
            if (!user) {
                res.status(404).json({ message: "User not found" });
            } else {
                res.status(200).json({
                    message: "Make admin successfully",
                    result: user
                });
            }
        })
        .catch(error => {
            res.status(500).json({ error: "this is server side error" })
        });
});

// delete a single user
// sent data to params:- http://localhost:5000/user/delete/id type hear...
route.delete("/delete/:id", async (req, res) => {
    const { id } = req.params
    try {
        const deleteUser = await User.findByIdAndDelete(id)
        if (deleteUser) {
            console.log(deleteUser);
            res.status(200).json({ message: "Delete user successfully" })
        } else {
            res.status(500).json({ error: "this is server side error" })
        }
    } catch {
        res.status(500).json({ error: "this is server side error" })
    }

})

module.exports = route
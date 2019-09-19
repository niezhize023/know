const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//处理跨域
app.use(require('./Tools/cors').cors);

//parse content-type   application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));
//content-type   application/json
app.use(bodyParser.json());

//启用子路由
app.use('/user', require('./Controller/UserController'));
app.use('/topic', require('./Controller/TopicController'));
<<<<<<< HEAD


=======
app.use("/backstage",require("./Controller/BackstageController"))
app.use("/upload",require("./Controller/UploadController"))
app.use('/uploads',express.static(__dirname+'/uploads'));
>>>>>>> 9982ba2ae28c91b8eb051d40adc4e3f2e9e8a3fe
app.listen(81, () => {
    console.log('Example app listening on port 81!');
});
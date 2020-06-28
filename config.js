module.exports = {
    development :{
        port: 3000,
        secret_key:'secret',
        expiresIn : '1h',
        mongoUrl: 'mongodb://localhost/userapp',
        mongoDB: 'userapp'
    },
	production :{
        port: 3000,
        secret_key:'secret',
        expiresIn : '1h',
        mongoUrl: 'mongodb+srv://demo_user:xxxxxx@xxxxxxxxx.mongodb.net/>?retryWrites=true&w=majority',
        mongoDB: 'userapp'
    },
    environment : 'production',
    getConfig: function(){
        if(this.environment == 'development'){
            return this.development;
        }
		if(this.environment == 'production'){
            return this.production;
        }
    }
}
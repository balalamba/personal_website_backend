## Personal website API by employing Clean Architecture
## TechStack: 
- Express.js
- MongoDB
- Passport.js
- Winston
- Nodemailer
- etc.


## Features
- Users
 - Registration
 - Login
 - Logout
- Messages (from public contact form)
 - Get list of received messages
 - Add message (storing in DB and sending emails)
 - Update message ( read / important)
 - Delete message
- Blog
 - Get list of posts (with filter by any property for ex. tag or language etc...)
 - Get post
 - Add / Update post 
- Photo galleries
 - Get list of galleries
 - Add / Update gallery
 - Get one gallery
 - Delete gallery
 - Upload images
 - Delete images
- Coming soon
 - Push notification

First of all you need to rename and fill the *example.env* file !

```
BASE_API_ROOT='/api' // prefix to all API routes
DB_URL='mongodb://localhost:27017'
DB_NAME='your_db_name'
PORT='8082'
DEVPORT='8082' 
HOST='remote_server_ip_or_address'
DEVHOST='localhost'
JWTSECRET='your_secret_phrase'
STATIC_DEV='dev_server_ip_or_address/static_folder'
STATIC_PROD='production_server_ip_or_address/static_folder'
BLOGFOLDER='/img/blog' // Directory to stock blog images
PHOTOSFOLDER='/img/photos' // Directory to stock gallery images
SITEURL='http://your-website-url'
OWNEREMAIL='contact@your-email.com' // Email account for receiving emails
OWNERNAME='Your name'
PUBLIC_VAPID_KEY='' // webpush public key
PRIVATE_VAPID_KEY='' // webpush private key
SMTP_HOST='smtp.yandex.ru' //SMTP hosy to send email
EMAIL_SENDER='robot@email.com' // Email account for sending emails
EMAIL_SENDER_PASSWORD='robot_mail_password'
```

### Scripts
####  For development
``` npm run dev ```
#### For testing
``` npm run test ```
#### Start in production mode
``` npm run prod ```
#### Start using PM2 
``` npm run start ```
#### Copy necessary code to remote server 
You need to adapt vpsdeploy script first.
"vpsdeploy": "rsync -avr -e 'ssh -l <user>' --exclude '.git' --exclude 'package-lock.json' --exclude 'node_modules' ./ <server_adress>:~/<destination_folder>"
Then: 
``` npm run vpsdeploy``` to send files to remote server.


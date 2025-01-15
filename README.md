npm install
npm run dev

create db 
mws 
in mongodb


localhost:8000/v1/auth/sign-up
{post}

{
    "fullName": "Yogesh sahu",
    "email": "yug123@gmail.com",
    "newPassword": "Yug123",
    "confirmNewPassword": "Yug1234",
    "phone": "7976339216",
    "age": 25,
    "monthlySalary": 50000
    "balance": 10000
}
*********************************

localhost:8000/v1/auth/sign-in
{post}
{
    "email": "yug123@gmail.com",
    "password": "Yug123"
}
**********************************

localhost:8000/v1/transaction/withdraw
{post}
{
    "accno": "MV455345543",
    "amount": 500,
    "currency": "INR",
    "withdrawFrom": "office",
    "notes": {
        "50": 6,
        "100": 2
    }
}
***********************************
localhost:8000/v1/transaction?accno=MV455345543
{get}
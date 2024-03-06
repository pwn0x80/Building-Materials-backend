import {LoginService, RegistrationService} from "../controllers/auth.controller"
import { vi } from 'vitest'
describe("authentication api call ", () => {
  describe("register account", () => {

    test('register account with email and password', async () => {

      const createUser = vi.fn(() => Promise.resolve({
        id: "mock id",
        email: "mock email",
        salt: "mock salt",
        hash: 'mock hash'
      }));

      const getUserByEmail = vi.fn().mockImplementation(userDetail => ({ email: userDetail.email, salt: userDetail.salt, hash: userDetail.hash }))
      const encryptPasswordRegistration = vi.fn().mockImplementation((password) => ({ hash: "mock hash", salt: "mock salt" }))

      const curringRegistrationService = RegistrationService({ createUser, encryptPasswordRegistration });

      const reqMock: any = {
        body: {
          email: 'test@example.com',
          password: 'password123',
        },
      };

      const resMock: any = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
      };

      await curringRegistrationService(reqMock, resMock);
      console.log(resMock.status.mock.calls);
      console.log(resMock.json.mock.calls);
      console.log(resMock.json.mock.calls);
      expect(resMock.status).toHaveBeenCalledWith(201);
      expect(resMock.json).toHaveBeenCalledWith({ message: "Registration successful", data: { id: "mock id" } });
    });


    test('register account missing email value', async () => {

      const createUser = vi.fn(() => Promise.resolve({
        id: "mock id",
        email: "mock email",
        salt: "mock salt",
        hash: 'mock hash'
      }));

      const getUserByEmail = vi.fn().mockImplementation(userDetail => ({ email: userDetail.email, salt: userDetail.salt, hash: userDetail.hash }))
      const encryptPasswordRegistration = vi.fn().mockImplementation((password) => ({ hash: "mock hash", salt: "mock salt" }))

      const curringRegistrationService = RegistrationService({ createUser, encryptPasswordRegistration });

      const reqMock: any = {
        body: {
          // email: 'test@example.com',
          password: 'password123',
        },
      };

      const resMock: any = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
      };

      await curringRegistrationService(reqMock, resMock);
      console.log(resMock.status.mock.calls);
      console.log(resMock.json.mock.calls);
      console.log(resMock.json.mock.calls);
      expect(resMock.status).toHaveBeenCalledWith(400);
      expect(resMock.json).toHaveBeenCalledWith({ message: "Email is required" });
    });


    test('register account missing password value', async () => {

      const createUser = vi.fn(() => Promise.resolve({
        id: "mock id",
        email: "mock email",
        salt: "mock salt",
        hash: 'mock hash'
      }));

      const getUserByEmail = vi.fn().mockImplementation(userDetail => ({ email: userDetail.email, salt: userDetail.salt, hash: userDetail.hash }))
      const encryptPasswordRegistration = vi.fn().mockImplementation((password) => ({ hash: "mock hash", salt: "mock salt" }))

      const curringRegistrationService = RegistrationService({ createUser, encryptPasswordRegistration });

      const reqMock: any = {
        body: {
          email: 'test@example.com',
          // password: 'password123',
        },
      };

      const resMock: any = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
      };

      await curringRegistrationService(reqMock, resMock);
      console.log(resMock.status.mock.calls);
      console.log(resMock.json.mock.calls);
      console.log(resMock.json.mock.calls);
      expect(resMock.status).toHaveBeenCalledWith(400);
      expect(resMock.json).toHaveBeenCalledWith({ message: "Password is required" });
    });


    test('register account missing email and password value', async () => {

      const createUser = vi.fn(() => Promise.resolve({
        id: "mock id",
        email: "mock email",
        salt: "mock salt",
        hash: 'mock hash'
      }));

      const getUserByEmail = vi.fn().mockImplementation(userDetail => ({ email: userDetail.email, salt: userDetail.salt, hash: userDetail.hash }))
      const encryptPasswordRegistration = vi.fn().mockImplementation((password) => ({ hash: "mock hash", salt: "mock salt" }))

      const curringRegistrationService = RegistrationService({ createUser, encryptPasswordRegistration });

      const reqMock: any = {
        // body: {
        // email: 'test@example.com',
        // password: 'password123',
        // },
      };

      const resMock: any = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
      };

      await curringRegistrationService(reqMock, resMock);
      console.log(resMock.status.mock.calls);
      console.log(resMock.json.mock.calls);
      console.log(resMock.json.mock.calls);
      expect(resMock.status).toHaveBeenCalledWith(400);
      expect(resMock.json).toHaveBeenCalledWith({ message: "Email and password are required" });
    });

    test('register account missing body', async () => {

      const createUser = vi.fn(() => Promise.resolve({
        id: "mock id",
        email: "mock email",
        salt: "mock salt",
        hash: 'mock hash'
      }));

      const getUserByEmail = vi.fn().mockImplementation(userDetail => ({ email: userDetail.email, salt: userDetail.salt, hash: userDetail.hash }))
      const encryptPasswordRegistration = vi.fn().mockImplementation((password) => ({ hash: "mock hash", salt: "mock salt" }))

      const curringRegistrationService = RegistrationService({ createUser, encryptPasswordRegistration });

      const reqMock: any = {
        body: {
          // email: 'test@example.com',
          // password: 'password123',
        },
      };

      const resMock: any = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
      };

      await curringRegistrationService(reqMock, resMock);
      console.log(resMock.status.mock.calls);
      console.log(resMock.json.mock.calls);
      console.log(resMock.json.mock.calls);
      expect(resMock.status).toHaveBeenCalledWith(400);
      expect(resMock.json).toHaveBeenCalledWith({ message: "Email and password are required" });
    });

    test('duplicate register test', async () => {

      const createUser = vi.fn(() => Promise.resolve({
        errorCode:11000,
        message:"Duplicate Account."
      }));

      const getUserByEmail = vi.fn().mockImplementation(userDetail => ({ email: userDetail.email, salt: userDetail.salt, hash: userDetail.hash }))
      const encryptPasswordRegistration = vi.fn().mockImplementation((password) => ({ hash: "mock hash", salt: "mock salt" }))

      const curringRegistrationService = RegistrationService({ createUser, encryptPasswordRegistration });

      const reqMock: any = {
        body: {
          email: 'test@example.com',
          password: 'password123',
        },
      };

      const resMock: any = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
      };

      await curringRegistrationService(reqMock, resMock);
      console.log(resMock.status.mock.calls);
      console.log(resMock.json.mock.calls);
      console.log(resMock.json.mock.calls);
      expect(resMock.status).toHaveBeenCalledWith(409);
      expect(resMock.json).toHaveBeenCalledWith({ message: "Duplicate Account." });
    });


  })




  describe("login account",()=>{
    test('login account with email and password', async () => {
      const getUserByEmail = vi.fn(()=>
        Promise.resolve({
          message:"USER_FOUND",
          userDetail: {
            hash: "mock hash",
            salt: "mock salt"
          }})
      )
      const validPasswordTrueRet = vi.fn().mockImplementation(()=>true);
      const jwtSign = vi.fn().mockImplementation(()=>"Bearer mock token");
      const reqMock: any = {
        body:{
          email:"mockEmail",
          password:"mockPassword"
        }
      }
      const resMock:any = {
        status:vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis()
      }

      let loginService = LoginService({validPassword: validPasswordTrueRet,
      getUserByEmail:getUserByEmail,
        jwtSign:jwtSign
      })

       await loginService(reqMock,resMock);

      expect(resMock.status).toHaveBeenCalledWith(200)
      expect(resMock.json).toHaveBeenCalledWith({message:'Login successful', token: 'Bearer mock token'})

    })




    test('login account missing password', async () => {
      const getUserByEmail = vi.fn(()=>
          Promise.resolve({
            message:"USER_FOUND",
            userDetail: {
              hash: "mock hash",
              salt: "mock salt"
            }})
      )
      const validPasswordTrueRet = vi.fn().mockImplementation(()=>true);
      const jwtSign = vi.fn().mockImplementation(()=>"Bearer mock token");
      const reqMock: any = {
        body:{
          email:"mockEmail",
//          password:"mockPassword"
        }
      }
      const resMock:any = {
        status:vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis()
      }

      let loginService = LoginService({validPassword: validPasswordTrueRet,
        getUserByEmail:getUserByEmail,
        jwtSign:jwtSign
      })

      await loginService(reqMock,resMock);

      expect(resMock.status).toHaveBeenCalledWith(400)
      expect(resMock.json).toHaveBeenCalledWith({message:'Password is required'})

    })


    test('login account missing email', async () => {
      const getUserByEmail = vi.fn(()=>
          Promise.resolve({
            message:"USER_FOUND",
            userDetail: {
              hash: "mock hash",
              salt: "mock salt"
            }})
      )
      const validPasswordTrueRet = vi.fn().mockImplementation(()=>true);
      const jwtSign = vi.fn().mockImplementation(()=>"Bearer mock token");
      const reqMock: any = {
        body:{
//          email:"mockEmail",
          password:"mockPassword"
        }
      }
      const resMock:any = {
        status:vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis()
      }

      let loginService = LoginService({validPassword: validPasswordTrueRet,
        getUserByEmail:getUserByEmail,
        jwtSign:jwtSign
      })

      await loginService(reqMock,resMock);

      expect(resMock.status).toHaveBeenCalledWith(400)
      expect(resMock.json).toHaveBeenCalledWith({message:'Email is required'})

    })


    test('login account missing password', async () => {
      const getUserByEmail = vi.fn(()=>
          Promise.resolve({
            message:"USER_FOUND",
            userDetail: {
              hash: "mock hash",
              salt: "mock salt"
            }})
      )
      const validPasswordTrueRet = vi.fn().mockImplementation(()=>true);
      const jwtSign = vi.fn().mockImplementation(()=>"Bearer mock token");
      const reqMock: any = {
        body:{
          email:"mockEmail",
//          password:"mockPassword"
        }
      }
      const resMock:any = {
        status:vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis()
      }

      let loginService = LoginService({validPassword: validPasswordTrueRet,
        getUserByEmail:getUserByEmail,
        jwtSign:jwtSign
      })

      await loginService(reqMock,resMock);

      expect(resMock.status).toHaveBeenCalledWith(400)
      expect(resMock.json).toHaveBeenCalledWith({message:'Password is required'})

    })



    test('login account missing password and password ', async () => {
      const getUserByEmail = vi.fn(()=>
          Promise.resolve({
            message:"USER_FOUND",
            userDetail: {
              hash: "mock hash",
              salt: "mock salt"
            }})
      )
      const validPasswordTrueRet = vi.fn().mockImplementation(()=>true);
      const jwtSign = vi.fn().mockImplementation(()=>"Bearer mock token");
      const reqMock: any = {
        body:{
   //       email:"mockEmail",
//          password:"mockPassword"
        }
      }
      const resMock:any = {
        status:vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis()
      }

      let loginService = LoginService({validPassword: validPasswordTrueRet,
        getUserByEmail:getUserByEmail,
        jwtSign:jwtSign
      })

      await loginService(reqMock,resMock);

      expect(resMock.status).toHaveBeenCalledWith(400)
      expect(resMock.json).toHaveBeenCalledWith({message:'Email and password are required'})

    })

    test('login account missing body', async () => {
      const getUserByEmail = vi.fn(()=>
          Promise.resolve({
            message:"USER_FOUND",
            userDetail: {
              hash: "mock hash",
              salt: "mock salt"
            }})
      )
      const validPasswordTrueRet = vi.fn().mockImplementation(()=>true);
      const jwtSign = vi.fn().mockImplementation(()=>"Bearer mock token");
      const reqMock: any = {
      //  body:{
          //       email:"mockEmail",
//          password:"mockPassword"
       // }
      }
      const resMock:any = {
        status:vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis()
      }

      let loginService = LoginService({validPassword: validPasswordTrueRet,
        getUserByEmail:getUserByEmail,
        jwtSign:jwtSign
      })

      await loginService(reqMock,resMock);

      expect(resMock.status).toHaveBeenCalledWith(400)
      expect(resMock.json).toHaveBeenCalledWith({message:'Email and password are required'})

    })



    test('User Invalid password', async () => {
      const getUserByEmail = vi.fn(()=>
          Promise.resolve({
            message:"USER_FOUND",
            userDetail: {
              hash: "mock hash",
              salt: "mock salt"
            }})
      )
      const validPasswordTrueRet = vi.fn().mockImplementation(()=>false);
      const jwtSign = vi.fn().mockImplementation(()=>"Bearer mock token");
      const reqMock: any = {
          body:{
               email:"mockEmail",
         password:"mockPassword"
        }
      }
      const resMock:any = {
        status:vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis()
      }

      let loginService = LoginService({validPassword: validPasswordTrueRet,
        getUserByEmail:getUserByEmail,
        jwtSign:jwtSign
      })

      await loginService(reqMock,resMock);

      expect(resMock.status).toHaveBeenCalledWith(400)
      expect(resMock.json).toHaveBeenCalledWith({message:"invalid password"})

    })



    test('user does not exist', async () => {
      const getUserByEmail = vi.fn(()=>
          Promise.resolve({
            message:"USER_NOT_FOUND",
            userDetail: {
              hash: "mock hash",
              salt: "mock salt"
            }})
      )
      const validPasswordTrueRet = vi.fn().mockImplementation(()=>false);
      const jwtSign = vi.fn().mockImplementation(()=>"Bearer mock token");
      const reqMock: any = {
        body:{
          email:"mockEmail",
          password:"mockPassword"
        }
      }
      const resMock:any = {
        status:vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis()
      }

      let loginService = LoginService({validPassword: validPasswordTrueRet,
        getUserByEmail:getUserByEmail,
        jwtSign:jwtSign
      })

      await loginService(reqMock,resMock);

      expect(resMock.status).toHaveBeenCalledWith(400)
      expect(resMock.json).toHaveBeenCalledWith({message:"User does not exist. Please check your email or sign up."})

    })


  })
})












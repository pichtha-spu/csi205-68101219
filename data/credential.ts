type User = {
    email: string
    password: string
    name: string
    role: string
    other: string
}

const users: User[] = [
    {
        email: 'admin@company.com',
        password: 'pass',
        name: 'นายพิชญ์ ทาทอง',
        role: 'admin',
        other: '....'
    },
    {
        email: 'user@company.com',
        password: 'pass',
        name: 'น.ส.น้ำทิพย์ ชอบกินน้ำพลัส',
        role: 'user',
        other: '....'
    },
    {
        email: 'manager@company.com',
        password: 'pass',
        name: 'นายหงศ์ทอง ชอบกินหงศ์ไทย',
        role: 'manager',
        other: '....'
    }
]

export type Credential = {
    token: string
    email: string
    name: string
    role: string
}

export const login = (email: string, password: string) : Promise<Credential| string> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() <= 0.8) {
                // find User by email,pass
                const user = users.find(
                    (u) => u.email === email && u.password === password
                )
                // check user
                if (user === undefined) 
                    {reject('User not found') 
                    return
                    }

                    
                // user  found
                    const newCredential: Credential = {
                        token: crypto.randomUUID(),
                        email: user.email,
                        name: user.name,
                        role: user.role
                    }
                    // ...store credential 
                    resolve(newCredential)

            } else {
                reject('connection refused')
            }
        }, 1000 + Math.random() * 2000)
    })
}
export const logout = (token: string):Promise<string> => {
 return new Promise((resolve, reject) => {
    setTimeout(() => {
        if (Math.random() <= 0.8) {
            // .. remove credential 
            resolve('success')
        }else{
            reject('connection refused')
        }
        },1000+Math.random()*2000);
    })
}
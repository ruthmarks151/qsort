
export function f() {
    "Hello ${user.name}".replace(/\${(.*?)}/, (c) => eval(c.substring(2, c.length - 1)) )
}
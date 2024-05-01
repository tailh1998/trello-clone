export const errorLogger = (name: string, ..._args: any): void => {
  console.error(
    "%c[::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::]",
    "background-color: white"
  )
  console.error(
    `%c[:::::::::::::::::: ${name} ERROR INFORMATION ::::::::::::::::::]`,
    "font-weight: bold; color: orange;"
  )
  console.error(`%c[:::::::::::::::::: <${name}-ERROR-WRAPPER > ::::::::::::::::::]`, "color: red;")
  console.error(..._args)
  console.error(
    `%c[:::::::::::::::::: <${name}-ERROR-WRAPPER /> ::::::::::::::::::]`,
    "color: red;"
  )
}

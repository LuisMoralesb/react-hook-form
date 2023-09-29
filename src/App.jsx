import { useForm } from 'react-hook-form'
import './App.css'

function App() {

  const { register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset } = useForm();
  const onSubmit = handleSubmit((data) => {
    console.log(data)
    reset()
  });

  return (
    <>
      <form onSubmit={onSubmit}>

        {/* Nombres */}
        <label htmlFor="nombres">Nombres</label>
        <input type="text"
          {...register("nombres",
            {
              required: {
                value: true,
                message: 'Nombres requeridos'
              },
              minLength: {
                value: 2,
                message: 'Minimo 2 caracteres'
              },
              maxLength: {
                value: 30,
                message: 'Maximo 30 caracteres'
              }
            }
          )} />
        {errors.nombres && <span> {errors.nombres.message} </span>}

        {/* Apellidos */}
        <label htmlFor="apellidos">Apellidos</label>
        <input type="text"
          {...register("apellidos",
            {
              required: {
                value: true,
                message: 'Apellidos requeridos'
              },
              minLength: {
                value: 2,
                message: 'Minimo 2 caracteres'
              },
              maxLength: {
                value: 30,
                message: 'Maximo 30 caracteres'
              }
            }
          )} />
        {errors.apellidos && <span> {errors.apellidos.message}</span>}

        {/* Email */}
        <label htmlFor="email">Email</label>
        <input type="text"
          {...register("email",
            {
              required: {
                value: true,
                message: 'Correo requerido'
              },
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: 'Correo no valido'
              }
            })
          } />
        {errors.email && <span> {errors.email.message}</span>}

        {/* Password */}
        <label htmlFor="password">Password</label>
        <input type="password"
          {...register("password",
            {
              required: {
                value: true,
                message: 'Password requerida'
              },
              minLength: {
                value: 8,
                message: 'Minimo 8 caracteres'
              }
            })} />
        {errors.password && <span> {errors.password.message}</span>}

        {/* Confirmar Password */}
        <label htmlFor="confirmarPassword">Confirmar password</label>
        <input type="password"
          {...register("confirmarPassword",
            {
              required: {
                value: true,
                message: 'Confirmar password es requerido'
              },
              validate: (value) => {
                return value === watch('password') || 'Los password no coinciden'
              }
            })} />
        {errors.confirmarPassword && <span> {errors.confirmarPassword.message} </span>}

        {/* Fecha de nacimiento */}
        <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
        <input type="date" name="fechaNacimiento"
          {...register("fechaNacimiento",
            {
              required: {
                value: true,
                message: 'Fecha de naciemiento es requerida'
              },
              validate: (value) => {
                const fechaNacimiento = new Date(value)
                const fechaActual = new Date()
                const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear()

                return edad >= 18 || 'Debes ser mayor de edad'
              }
            })} />
        {errors.fechaNacimiento && <span> {errors.fechaNacimiento.message}</span>}

        {/* Pais */}
        <label htmlFor="pais">Pais</label>
        <select
          {...register("pais",
            {
              required: {
                value: true,
                message: 'Debes seleccionar un pais'
              }
            })}
        // { errors.pais && <span> {errors.pais.message} </span>}
        >
          <option value="mx">Mexico</option>
          <option value="co">Colombia</option>
          <option value="ar">Argentina</option>
        </select>

        {
          watch('pais') == 'co' && (
            <input type='text' placeholder='Departamento'
              {...register("departamento",
                {
                  required: {
                    value: true,
                    message: 'Debes ingresar el departamento'
                  }
                })} />
          )}
        {errors.departamento && <span> {errors.departamento.message} </span>}

        {/* Foto */}
        <label htmlFor="foto">Foto de perfil</label>
        <input type="file" name="foto"
          onChange={(e) => {
            console.log(e.target.files[0])
            setValue('fotoDeUsuario', e.target.files[0].name)
          }} />

        {/* Terminos */}
        <label htmlFor="terminos">Terminos y condiciones</label>
        <input type="checkbox" name="terminos"
          {...register("terminos",
            {
              required: {
                value: true,
                message: 'Debes aceptar los terminos y condiciones'
              }
            })} />
        {errors.terminos && <span> {errors.terminos.message} </span>}

        {/* Boton registrar */}
        <button>Registrar</button>

        <pre>
          {JSON.stringify(watch(), null, 2)}
        </pre>

      </form>
    </>
  )
}

export default App

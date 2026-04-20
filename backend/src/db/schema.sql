-- Tabla roles para docker-compose
create table if not exists roles (
   id serial primary key,
   role varchar(50) unique not null
);

-- Insertar los roles
insert into roles (role) values ('SuperAdmin') on conflict (role) do nothing;
insert into roles (role) values ('Auditor') on conflict (role) do nothing;
insert into roles (role) values ('Registrador') on conflict (role) do nothing;

-- Tabla usuarios para docker-compose
create table if not exists usuarios (
   id           serial primary key,
   nombre       varchar(100) not null,
   email        varchar(150) unique not null,
   contrasena   varchar(255) not null,
   ultimo_login timestamp,
   rol_id       integer    references roles(id)
);

-- Insertar super usuario inicial
insert into usuarios (nombre, email, contrasena, rol_id)
   values(
      'Jose David Carvajal',
      'jodacarvajal@gmail.com',
      '$2b$12$oAqwngeowHzqGpYROhbJoeq.3vW0niTFiypePCB0tbI3IQ/20QeMe', -- Contraseña: 12345678
      (select id from roles where role = 'SuperAdmin')
   )
   on conflict (email) do nothing;

-- Tabla productos para docker-compose
create table if not exists productos (
   id          serial primary key,
   codigo      varchar(50) unique not null,
   nombre      varchar(150) not null,
   descripcion text,
   cantidad    integer not null default 0,
   precio      numeric(10,2) not null
);

-- Tabla log_auditoria para docker-compose
create table if not exists log_auditoria (
   id         serial primary key,
   timestamp  timestamp default now(),
   usuario_id integer
      references usuarios ( id ),
   accion     varchar(100) not null,
   detalle    text,
   ip_origen  varchar(45),
   resultado  varchar(20)
);
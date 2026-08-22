<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pagina Inicial</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>
    <!--NavBar-->
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="index.php"><img src="https://images.icon-icons.com/520/PNG/512/House_icon-icons.com_52056.png"
            style = "width:50px; height:50px;"></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="collapsibleNavbar">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="soporte.php">Soporte</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="servicios.php">Servicios</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="productos.php">Productos</a>
                    </li>
                    <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="empresa.php" role="button" data-bs-toggle="dropdown">Empresa</a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Sobre Nosotros</a></li>
                            <li><a class="dropdown-item" href="#">Misión</a></li>
                            <li><a class="dropdown-item" href="#">Visión</a></li>
                        </ul>
                        </li>
                </ul>
            </div>
                <button type="button" class="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#myModal">Acceder</button>         
        </div>
    </nav>
    <!--Contenedores-->
    <div class="container mt-5 mb-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card shadow">
                    <div class="card-header bg-dark text-white">
                        <h5 class="mb-0">Finalizar Compra</h5>
                    </div>
                    <div class="card-body">
                        <div class="alert alert-success text-center mb-4">
                            <h5 class="text-center text-success mb-3" id="lblTotal">Total Carrito: $0</h5>
                        </div>
                        
                        <hr>
                        <h5 class="mb-3">Datos de Envío</h5>
                          <!--Formulario-->
                        <form action="index.php" method="POST">
                            <div class="mb-3">
                                <label class="form-label">Nombre Completo:</label>
                                <input type="text" class="form-control" required placeholder="Nombre">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Correo Electrónico:</label>
                                <input type="email" class="form-control" required placeholder="Correo">
                            </div>
                            <div class="mb-4">
                                <label class="form-label">Dirección de Envío:</label>
                                <input type="text" class="form-control" required placeholder="Calle,Comuna">
                            </div>
                            
                            <button type="submit" class="btn btn-primary w-100" onclick="limpiarCarro()">Confirmar Compra</button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--Pie de pagina-->
    <div class = "container-fluid text-center bg-black">
        <div class="row">
            <div class="col-4"></div>
            <div class="col-4" style = "color:white"><strong>Empresa2026</strong></div>
            <div class="col-4"></div>
        </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="myModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <!-- Modal Cabecera -->
                <div class="modal-header">
                    <h4 class="modal-title">Autenticar</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <!-- Modal Cuerpo -->
                <div class="modal-body">
                    <form action="empresa.php">
                        <div class="mb-3 mt-3">
                            <label for="email" class="form-label">Email:</label>
                            <input type="email" class="form-control" id="email" placeholder="Correo Electronico" name="email">
                        </div>
                        <div class="mb-3">
                            <label for="pwd" class="form-label">Contraseña:</label>
                            <input type="password" class="form-control" id="pwd" placeholder="Contraseña" name="pswd">
                        </div>
                        <div class="form-check mb-3">
                            <label class="form-check-label">
                            <input class="form-check-input" type="checkbox" name="remember"> Recordarme
                            </label>
                        </div>
                        <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
                    </form>
                </div>

                <!-- Modal Pie -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                </div>

            </div>
        </div>
    </div>
</body>
</html>
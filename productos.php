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
    <div id="demo" class="carousel slide" data-bs-ride="carousel">

    <!-- Indicators/dots -->
    <div class="carousel-indicators">
        <button type="button" data-bs-target="#demo" data-bs-slide-to="0" class="active"></button>
        <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
        <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
    </div>

  <!-- The slideshow/carousel -->
    <div class="carousel-inner">
        <div class="carousel-item active">
            <img src="https://cdn.create.vista.com/api/media/small/60327489/stock-vector-electrical-pylons" class="d-block w-100" style="height: 400px; object-fit: cover;">
            <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded">
                <h5>Componentes Electrónicos</h5>
                <p>Encuentra todo para tus circuitos.</p>
            </div>
        </div>
        <div class="carousel-item">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm-0654xD9zRbeIJ8IWFMlaRZnhaLEJq2O73jJfChmAwW2sbDAXXHAvGs&s=10" class="d-block w-100" style="height: 400px; object-fit: cover;">
            <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded">
                <h5>Componentes Electrónicos</h5>
                <p>Encuentra todo para tus circuitos.</p>
            </div>        
        </div>
        <div class="carousel-item">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMHpkLEN4uYap5TZuKxahRpa7HhBD9pGLcNLBsiLcJA0wLrvOSNc4_NWY&s=10" class="d-block w-100" style="height: 400px; object-fit: cover;">
            <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded">
                <h5>Componentes Electrónicos</h5>
                <p>Encuentra todo para tus circuitos.</p>
            </div>
        </div>
    </div>

    <!-- Left and right controls/icons -->
    <button class="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
        <span class="carousel-control-prev-icon"></span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
        <span class="carousel-control-next-icon"></span>
    </button>
    </div>
    <!-- Productos -->
    <div class="container mt-5 mb-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card shadow">
                    <div class="card-header bg-dark text-white">
                        <h5 class="mb-0">Gestión de Productos</h5>
                    </div>
                    <div class="card-body">
                        <label class="form-label">Seleccionar Producto:</label>
                        <select class="form-select mb-3" id="cmbProducto" onchange="mostrarPrecio()"></select>
                        <button type="button" class="btn btn-outline-primary w-100 mb-3" onclick="agregarAlCarro()">Agregar al carro</button>
                        <hr>
                        <h5 class="text-center text-success mb-3" id="lblTotal">Total Carrito: $0</h5>
                        <button type="button" class="btn btn-success w-100" onclick="irCarro()">Ir a pagar</button>
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
    <!-- JS -->
    <script src="js_PR3.js"></script>
    <script>
        cargarProductos();
        mostrarPrecio();
    </script>
</body>
</html>
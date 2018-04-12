# Jquery Form Validation
Scripts para validação de formulários HTML5 + Bootstrap.

Validaçes realizadas com o plugin:
- required;
- cpf;
- cnpj;
- email;
- data (dd/mm/yyyy);
- data máxima (dd/mm/yyyy);
- data mínima (dd/mm/yyyy);
- confirmação de senha;


### Exemplo de formulário com o validador:
```
<form method="post" class="form-validation">

    <div class="row">
        
        <!-- REQUIRED -->
        <div class="form-group">
            <label>Nome</label>
            <input type="text" value="" data-validation-required />
        </div>
        
        <!-- CPF - data-validation-required é inserido para não permitir campo vazio -->
        <div class="form-group">
            <label>CPF</label>
            <input type="text" value="" data-validation-required data-validation-cpf />
        </div>
        
        <!-- CNPJ - data-validation-required é inserido para não permitir campo vazio -->
        <div class="form-group">
            <label>CNPJ</label>
            <input type="text" value="" data-validation-required data-validation-cnpj />
        </div>
        
        <!-- DATA - manter type="text" -->
        <div class="form-group">
            <label>Data de registro</label>
            <input type="text" value="" data-validation-date/>
        </div>
       
        <!-- DATA MÍNIMA E DATA MÁXIMA - manter type="text" -->
        <div class="form-group">
            <label>Data de nascimento</label>
            <input type="text" value="" data-validation-mindate="01/01/1900"  data-validation-maxdate="01/01/2018"/>
        </div>
        
        <!-- E-MAIL - manter type="text" -->
        <div class="form-group">
            <label>E-mail</label>
            <input type="text" value="" data-validation-required data-validation-email />
        </div>

        
        <!-- CONFIRMAÇÃO DE SENHA -->
        <div class="form-group">
            <label>Senha</label>
            <input type="password" value="" id="senha"/>
        </div>
        <div class="form-group">
            <label>Senha</label>
            <input type="password" value="" data-validation-passwordconfirm="senha"/>
        </div>


    </div>
    
</form>
    
```

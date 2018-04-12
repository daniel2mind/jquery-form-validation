$(function(){

    var errorClassName = 'validation-error-class';

    $('.form-validation').on('submit', function(event){

        var form = this;

        var elements = $(form).find('input[type!="hidden"], select[type!="hidden"], textarea[type!="hidden"]');

        var hasErrors = true;

        var messages = {
            required: 'O campo é obrigatório',
            cpf: 'O CPF é inválido',
            cnpj: 'O CNPJ é inválido',
            email: 'O e-mail é inválido',
            date: 'A data é inválida',
            minDate: 'Insira uma data igual ou superior a %s',
            maxDate: 'Insira uma data igual ou superior a %s',
            passwordConfirm: 'Confirmação de senha incorreta',
            minCheck: 'Selecione pelo menos %s item/itens',
            maxCheck: 'Selecione até %s item/itens'
        };

        var errorClass = '<span class="'+errorClassName+'" style="color: #b80000; font-size: smaller">%message</span>';

        var index = 0;

        $(elements).each(function(){

            var element = elements[index];

            var divElement = $(element).parent('.form-group');


            //limpa os erros anteriores
            var spanError  = $(divElement).find('.'+errorClassName);
            $(spanError).remove();
            $(element).removeClass('validation-has-error');


            //required validation
            if(element.hasAttribute('data-validation-required'))
            {
                if($(element).val() === '')
                {
                    $(element).addClass('validation-has-error');
                    $(divElement).append(errorClass.replace('%message',messages.required))
                }
            }

            //cpf validation
            if(element.hasAttribute('data-validation-cpf') && $(element).val() !== '')
            {
                var cpf = $(element).val().replace(/[^\d]+/g,'');

                var error = false;

                if (cpf.length != 11 || cpf == "00000000000" || cpf == "11111111111" || cpf == "22222222222" || cpf == "33333333333" || cpf == "44444444444" || cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" || cpf == "88888888888" || cpf == "99999999999")
                {
                    error = true;
                }

                var add = 0;
                for (i=0; i < 9; i ++) add += parseInt(cpf.charAt(i)) * (10 - i);
                rev = 11 - (add % 11);
                if (rev == 10 || rev == 11) rev = 0;
                if (rev != parseInt(cpf.charAt(9))) error = true;
                // Valida 2o digito
                add = 0;
                for (i = 0; i < 10; i ++) add += parseInt(cpf.charAt(i)) * (11 - i);
                rev = 11 - (add % 11);
                if (rev == 10 || rev == 11) rev = 0;
                if (rev != parseInt(cpf.charAt(10))) error = true;

                if(error)
                {
                    $(element).addClass('validation-has-error');
                    $(divElement).append(errorClass.replace('%message',messages.cpf))
                }
            }

            //cnpj validation
            if(element.hasAttribute('data-validation-cnpj') && $(element).val() !== '')
            {
                var cnpj = $(element).val().replace(/[^\d]+/g,'');

                var error = false;

                // Elimina CNPJs invalidos conhecidos
                if (cnpj.length != 14 || cnpj == "00000000000000" || cnpj == "11111111111111" || cnpj == "22222222222222" || cnpj == "33333333333333" || cnpj == "44444444444444" || cnpj == "55555555555555" || cnpj == "66666666666666" || cnpj == "77777777777777" || cnpj == "88888888888888" || cnpj == "99999999999999")
                {
                    error = true;
                }

                tamanho = cnpj.length - 2
                numeros = cnpj.substring(0,tamanho);
                digitos = cnpj.substring(tamanho);
                soma = 0;
                pos = tamanho - 7;
                for (i = tamanho; i >= 1; i--) {
                    soma += numeros.charAt(tamanho - i) * pos--;
                    if (pos < 2)
                        pos = 9;
                }
                resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
                if (resultado != digitos.charAt(0)) error = true;

                tamanho = tamanho + 1;
                numeros = cnpj.substring(0,tamanho);
                soma = 0;
                pos = tamanho - 7;
                for (i = tamanho; i >= 1; i--) {
                    soma += numeros.charAt(tamanho - i) * pos--;
                    if (pos < 2)
                        pos = 9;
                }
                resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
                if (resultado != digitos.charAt(1)) error = true;

                if(error)
                {
                    $(element).addClass('validation-has-error');
                    $(divElement).append(errorClass.replace('%message',messages.cnpj))
                }
            }

            //email validation
            if(element.hasAttribute('data-validation-email') && $(element).val() !== '')
            {
                var email = $(element).val();

                var error = false;

                var atpos=email.indexOf("@");
                var dotpos=email.lastIndexOf(".");
                if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length)
                {
                    error = true;
                }

                if(error)
                {
                    $(element).addClass('validation-has-error');
                    $(divElement).append(errorClass.replace('%message',messages.email))
                }
            }

            //date validation - dd/mm/yyyy
            if(element.hasAttribute('data-validation-date') && $(element).val() !== '')
            {
                //limpa os erros anteriores
                spanError  = $(divElement).find('.'+errorClassName);
                $(spanError).remove();
                $(element).removeClass('validation-has-error');



                var date  = $(element).val();

                var error = false;

                var day   = date.substring(0,2);
                var month = date.substring(3,5);
                var year  = date.substring(6,10);

                date = new Date(year,(month-1),day);

                day   = parseInt(day,10) == parseInt(date.getDate());
                month = parseInt(month,10) == parseInt(date.getMonth())+1;
                year  = parseInt(year) == parseInt(date.getFullYear());

                if (!((day) && (month) && (year)))
                {
                    error = true;
                }

                if(error)
                {
                    $(element).addClass('validation-has-error');
                    $(divElement).append(errorClass.replace('%message',messages.date))
                }
            }

            //mindate validation - dd/mm/yyyy
            if(element.hasAttribute('data-validation-mindate') && $(element).val() !== '')
            {
                var date  = $(element).val();

                var error = false;

                var day   = date.substring(0,2);
                var month = date.substring(3,5);
                var year  = date.substring(6,10);

                date = new Date(year,(month-1),day);

                day   = parseInt(day,10) == parseInt(date.getDate());
                month = parseInt(month,10) == parseInt(date.getMonth())+1;
                year  = parseInt(year) == parseInt(date.getFullYear());

                if (!((day) && (month) && (year)))
                {
                    error = true;
                }

                if(!error)
                {
                    date = $(element).val().split("/").reverse().join("-");
                    var minDate = $(element).attr('data-validation-mindate').split("/").reverse().join("-");
                    if(date < minDate)
                    {
                        var message =  messages.minDate;
                        message = message.replace('%s',$(element).attr('data-validation-mindate'));
                        {
                            $(element).addClass('validation-has-error');
                            $(divElement).append(errorClass.replace('%message',message))
                        }
                    }
                }
            }


            //maxdate validation - dd/mm/yyyy
            if(element.hasAttribute('data-validation-maxdate') && $(element).val() !== '')
            {
                var date  = $(element).val();

                var error = false;

                var day   = date.substring(0,2);
                var month = date.substring(3,5);
                var year  = date.substring(6,10);

                date = new Date(year,(month-1),day);

                day   = parseInt(day,10) == parseInt(date.getDate());
                month = parseInt(month,10) == parseInt(date.getMonth())+1;
                year  = parseInt(year) == parseInt(date.getFullYear());

                if (!((day) && (month) && (year)))
                {
                    error = true;
                }

                if(!error)
                {
                    date = $(element).val().split("/").reverse().join("-");
                    var maxDate = $(element).attr('data-validation-maxdate').split("/").reverse().join("-");
                    if(date > maxDate)
                    {
                        var message =  messages.maxDate;
                        message = message.replace('%s',$(element).attr('data-validation-maxdate'));
                        {
                            $(element).addClass('validation-has-error');
                            $(divElement).append(errorClass.replace('%message',message))
                        }
                    }
                }
            }

            //passwordconfirm validation
            if(element.hasAttribute('data-validation-passwordconfirm') && $(element).val() !== '')
            {
                var password = $(element).attr('data-validation-passwordconfirm');

                if($(element).val() !== password.value)
                {
                    $(element).addClass('validation-has-error');
                    $(divElement).append(errorClass.replace('%message',messages.passwordConfirm))
                }
            }

            //mincheck validation
            if(element.hasAttribute('data-validation-mincheck'))
            {

            }


            //maxcheck validation
            if(element.hasAttribute('data-validation-maxcheck'))
            {

            }

            index++;

        });

        if(hasErrors)
        {
            var firstError = $(this).find('.'+errorClassName);

            var position = $(firstError[0]).position();

            window.scrollTo(position.top, position.left);

            event.preventDefault();
            event.stopPropagation();
            return false;
        }

    });


    $('input, select, textarea').on('keyup change',function(){
        if($(this).hasClass('validation-has-error'))
        {
            var divElement = $(this).parent('.form-group');
            var spanError  = $(divElement).find('.'+errorClassName);
            $(spanError).remove();
            $(this).removeClass('validation-has-error');
        }
    })

});

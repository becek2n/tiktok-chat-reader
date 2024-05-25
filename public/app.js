
$(document).ready(() => {
    $('#connectButton').click(connect);
    $('#uniqueIdInput').on('keyup', function (e) {
        if (e.key === 'Enter') {
            connect();
        }
    });

    if (window.settings.username) connect();

    if ('speechSynthesis' in window) {
        speechSynthesis.onvoiceschanged = function() {
            var $voicelist = $('#voices');

            if($voicelist.find('option').length == 0) {
                speechSynthesis.getVoices().forEach(function(voice, index) {
                var $option = $('<option>')
                .val(index)
                .html(voice.name + (voice.default ? ' (default)' :''));

                $voicelist.append($option);
                });

                $voicelist.material_select();
            }
        }



    } else {
        $('#modal1').openModal();
    }

})




const supabase = require('./config/supabaseClient');

async function fixBalance() {
  const email = 'connita1800@gmail.com';
  console.log(`Intentando forzar saldo para: ${email}`);

  // Primero buscamos el usuario para estar seguros de los datos
  const { data: user } = await supabase
    .from('usuarios')
    .select('*')
    .eq('email', email)
    .single();

  if (!user) {
    console.error('Usuario no encontrado');
    process.exit(1);
  }

  console.log('Usuario encontrado:', user);

  // Intentamos actualización por ID
  const { data: updateData, error: updateError } = await supabase
    .from('usuarios')
    .update({ saldo: 500000 })
    .eq('id', user.id)
    .select();

  if (updateError) {
    console.error('Error al actualizar por ID:', updateError);
  } else {
    console.log('Resultado update por ID:', updateData);
  }

  // Si falló (resultado vacío), intentamos UPSERT
  if (!updateData || updateData.length === 0) {
    console.log('Intentando UPSERT...');
    const { data: upsertData, error: upsertError } = await supabase
      .from('usuarios')
      .upsert({ 
        id: user.id, 
        email: user.email, 
        nombre: user.nombre, 
        password: user.password,
        saldo: 500000 
      })
      .select();
    
    if (upsertError) console.error('Error en UPSERT:', upsertError);
    else console.log('Resultado UPSERT:', upsertData);
  }

  // Verificación final
  const { data: final } = await supabase.from('usuarios').select('email, saldo').eq('id', user.id);
  console.log('Estado final:', final);

  process.exit(0);
}

fixBalance();

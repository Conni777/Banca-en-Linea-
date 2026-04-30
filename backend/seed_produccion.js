
const supabase = require('./config/supabaseClient');

async function initTestData() {
  console.log('Iniciando carga de datos de prueba...');

  // 1. Darle saldo a Constanza (ID 7)
  const { error: error1 } = await supabase
    .from('usuarios')
    .update({ saldo: 500000 })
    .eq('id', 7);

  if (error1) console.error('Error al actualizar saldo de Constanza:', error1);
  else console.log('Saldo de Constanza actualizado a $500,000');

  // 2. Crear un usuario de prueba para recibir transferencias si no existe
  const { data: testUser, error: error2 } = await supabase
    .from('usuarios')
    .select('id')
    .eq('email', 'agente.destino@cyber.net')
    .single();

  if (!testUser) {
    const { data: newUser, error: error3 } = await supabase
      .from('usuarios')
      .insert([
        { 
          email: 'agente.destino@cyber.net', 
          nombre: 'Agente Destino', 
          password: 'hashed_dummy_pass',
          saldo: 10000 
        }
      ])
      .select();
    
    if (error3) console.error('Error al crear usuario destino:', error3);
    else console.log('Usuario destino creado con ID:', newUser[0].id);
  } else {
    console.log('Usuario destino ya existe con ID:', testUser.id);
  }

  console.log('Carga finalizada.');
  process.exit(0);
}

initTestData();

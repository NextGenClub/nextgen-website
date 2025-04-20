import sequelize from '../utils/database';

async function dumpSchema() {
  try {
    const [tables] = await sequelize.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `);

    console.log('Database Schema:');
    console.log('================');

    for (const table of tables) {
      const tableName = table.table_name;
      console.log(`\nTable: ${tableName}`);
      console.log('----------------');

      const [columns] = await sequelize.query(`
        SELECT column_name, data_type, is_nullable, column_default
        FROM information_schema.columns
        WHERE table_schema = 'public'
        AND table_name = '${tableName}'
        ORDER BY ordinal_position;
      `);

      for (const column of columns) {
        console.log(`${column.column_name}: ${column.data_type} ${column.is_nullable === 'YES' ? '(nullable)' : '(not null)'} ${column.column_default ? `[default: ${column.column_default}]` : ''}`);
      }

      const [constraints] = await sequelize.query(`
        SELECT tc.constraint_name, tc.constraint_type, kcu.column_name, ccu.table_name AS foreign_table_name, ccu.column_name AS foreign_column_name
        FROM information_schema.table_constraints tc
        LEFT JOIN information_schema.key_column_usage kcu
          ON tc.constraint_name = kcu.constraint_name
        LEFT JOIN information_schema.constraint_column_usage ccu
          ON ccu.constraint_name = tc.constraint_name
        WHERE tc.table_schema = 'public'
        AND tc.table_name = '${tableName}';
      `);

      if (constraints.length > 0) {
        console.log('\nConstraints:');
        for (const constraint of constraints) {
          if (constraint.constraint_type === 'FOREIGN KEY') {
            console.log(`  ${constraint.constraint_name}: ${constraint.column_name} -> ${constraint.foreign_table_name}.${constraint.foreign_column_name}`);
          } else if (constraint.constraint_type === 'PRIMARY KEY') {
            console.log(`  ${constraint.constraint_name}: PRIMARY KEY (${constraint.column_name})`);
          }
        }
      }
    }

    await sequelize.close();
  } catch (error) {
    console.error('Error dumping schema:', error);
  }
}

dumpSchema(); 
const dashboards = require('../config/config');

exports.getDashboardByRole = (req, res) => {
  const role = req.params.role;
  const data = dashboards[role];

  if (data) {
    res.json(data);
  } else {
    res.status(404).json({ error: 'Rol no encontrado' });
  }
};

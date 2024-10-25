const Finance = require('../models/financeModel');

//Crear
exports.addFinance =  async(req, res) => {
    const {amount, type, category, description} = req.body;
    try{
        const finance = new Finance({
            user:req.user.id,
            amount,
            type,
            category,
            description
        });
        const savedFinance = await finance.save();
        res.status(201).json(savedFinance);
    } catch(error){
        res.status(500).json({message:error.message});
    }
};
//obtener
exports.getFinances = async(req, res) =>{
    try{
        const finances = await Finance.find({
            user:req.user.id
        });
        res.json(finances);
        } catch(error){
        res.status(500).json({ message:error.message});
        }
};
// Eliminar una transacción
exports.deleteFinance = async (req, res) => {
    try {
        const finance = await Finance.findById(req.params.id);

        if (!finance) {
            return res.status(404).json({ message: 'Transacción no encontrada' });
        }

        if (finance.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'No autorizado' });
        }

        await finance.remove();
        res.json({ message: 'Transacción eliminada' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


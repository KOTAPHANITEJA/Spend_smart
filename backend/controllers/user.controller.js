import User from "../models/user.model.js";

export const createOrUpdateUser = async (req, res) => {
    const { name, email, income, emi } = req.body;

    try {
        const user = await User.findOneAndUpdate(
            { email }, // using email as unique identifier
            { name, email, income, emi },
            { new: true, upsert: true }
        );
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getUser = async (req, res) => {
    const { email } = req.params;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// ...existing code...

export const updateUser = async (req, res) => {
    const { email } = req.params;
    const { name, income, emi } = req.body;

    try {
        const user = await User.findOneAndUpdate(
            { email },
            { 
                ...(name && { name }),
                ...(income !== undefined && { income }),
                ...(emi !== undefined && { emi })
            },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
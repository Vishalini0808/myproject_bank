const createLoanApp = async(req,res) => {

   try {
     const data = {...req.body,
        user : req.user.id,
        requestedAmount : Number(req.body.requestedAmount),
        documents : {
            proof : req.files?.proof?.[0]?.path || null,

        },

    };

    const application = await createapp(data);

    res.status(201).json({
        message : "Loan application craeted",
        application
    });
   } catch (error) {
    res.status(500).json({
        message : "application failed"
    });
   }


};



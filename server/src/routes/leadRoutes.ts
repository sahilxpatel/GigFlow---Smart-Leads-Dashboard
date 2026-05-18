import { Router } from 'express';
import { addLead, editLead, getLead, getLeads, removeLead } from '../controllers/leadController.js';
import { authMiddleware } from '../middleware/auth.js';
import { authorizeRoles } from '../middleware/authorize.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { leadSchema } from '../validators/leadValidators.js';

export const leadRoutes = Router();

leadRoutes.use(authMiddleware);

leadRoutes.get('/', getLeads);
leadRoutes.get('/:id', getLead);
leadRoutes.post('/', validateRequest(leadSchema), addLead);
leadRoutes.put('/:id', validateRequest(leadSchema), editLead);
leadRoutes.delete('/:id', authorizeRoles('admin'), removeLead);

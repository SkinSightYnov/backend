# loki_deploy.sh
echo "Starting Loki Kubernetes setup..."

echo "Creating Loki config map..."
kubectl apply -f loki-configmap.yaml

echo "Creating Loki deployment..."
kubectl apply -f loki-deployment.yaml

echo "Getting the deployment name..."
kubectl get deployments --namespace=monitoring

echo "Creating Loki service..."
kubectl apply -f loki-service.yaml

echo "Accessing Loki through the service on node port 32000..."
kubectl get svc -n monitoring

echo "Loki Kubernetes setup completed."

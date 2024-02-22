# nest_cleanup.sh
echo "Starting cleanup of Nest JS Kubernetes setup..."

echo "Deleting namespace api..."
kubectl delete namespace api

echo "Nest JS Kubernetes setup cleanup completed."
